'use client'; 

import React, { useEffect, useRef } from "react";
import style from "./GameWindow.module.scss";
import IconButton from "../iconButton/IconButton.jsx";
import Sun from "../../../public/pixelSun.svg";
import Plant from "../../../public/pixelPlant.svg";
import Rain from "../../../public/pixelRain.svg";
import Snow from "../../../public/pixelSnow.svg";


const TILE_WIDTH = 16;
const TILE_HEIGHT = 32;
const SPRITE_SCALE = 1.5;
const BASE_SPEED = 0.25;

let GROWTH_TICKS_PER_STAGE = 900;
const SEEK_GROWN_PROBABILITY = 0.03;
const HARVEST_SPEED_MULTIPLIER = 1.6;
const HARVEST_ARRIVAL_DIST = 2;
const HARVEST_HITBOX_PADDING = 6;



class CropType {
  constructor(name, stageImages) {
    this.name = name;
    this.stageImages = stageImages;
  }
}

class Field {
  static STATES = {
    EMPTY: 0,
    PLANTED: 1,
    STAGE1: 2,
    STAGE2: 3,
    STAGE3: 4,
    GROWN: 5,
  };

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.state = Field.STATES.EMPTY;
    this.timer = 0;
    this.cropType = null;
  }

  isPlayerOver(px, py, pw = 16, ph = 32) {
    return (
      px + pw > this.x &&
      px < this.x + this.width &&
      py + ph > this.y &&
      py < this.y + this.height
    );
  }

  tryHarvest(px, py, pw = 16, ph = 32) {
    if (
      this.state === Field.STATES.GROWN &&
      this.isPlayerOver(px, py, pw, ph)
    ) {
      this.state = Field.STATES.EMPTY;
      this.cropType = null;
      this.timer = 0;
    }
  }

  update() {
    if (
      this.state > Field.STATES.EMPTY &&
      this.state < Field.STATES.GROWN
    ) {
      this.timer++;
      if (this.timer > GROWTH_TICKS_PER_STAGE) {
        this.state++;
        this.timer = 0;
      }
    }
  }

  draw(ctx) {
    if (this.state > Field.STATES.EMPTY && this.cropType) {
      const img = this.cropType.stageImages[this.state];
      if (img && img.complete) {
        ctx.drawImage(img, this.x, this.y - 10, this.width, this.height);
      }
    }
  }
}

const GameWindow = ({ colors }) => {
  const canvasRef = useRef(null);
  const weatherRef = useRef("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let bubbleTimer = null;

    const bg = new Image();
    bg.src = "/mappa_gioco.png"; 

    const sprites = {
      down: new Image(),
      up: new Image(),
      left: new Image(),
      right: new Image(),
    };
    sprites.down.src = "/playerAssets/player000.png";
    sprites.up.src = "/playerAssets/player002.png";
    sprites.left.src = "/playerAssets/player003.png";
    sprites.right.src = "/playerAssets/player001.png";

    function loadCropImagesFromFolder(cropName) {
      const stages = [];
      for (let i = 0; i <= 5; i++) {
        const img = new Image();
        img.src = `/vegetables/${cropName}/${cropName}00${i}.png`;
        stages.push(img);
      }
      return stages;
    }

    const cropTypes = [
      new CropType("potato", loadCropImagesFromFolder("potato")),
      new CropType("pumpkin", loadCropImagesFromFolder("pumpkin")),
    ];

    let x = 600;
    let y = 300;
    let direction = "down";
    let frame = 0;
    let frameCount = 3;
    let frameTimer = 0;
    let frameInterval = 10;
    let moveTimer = 0;
    let sowingMode = false;
    let sowingIndex = 0;

    // initialization fields
    let fields = [
      new Field(330, 300, 30, 30), new Field(330, 350, 30, 30),
      new Field(390, 300, 25, 25), new Field(390, 350, 25, 25),
      new Field(420, 300, 25, 25), new Field(420, 350, 25, 25),
      new Field(450, 300, 25, 25), new Field(450, 350, 25, 25),
      new Field(550, 300, 25, 25), new Field(550, 350, 25, 25),
      new Field(580, 300, 25, 25), new Field(580, 350, 25, 25),
      new Field(635, 300, 25, 25), new Field(635, 350, 25, 25),
      new Field(670, 300, 25, 25), new Field(670, 350, 25, 25),
      new Field(705, 300, 25, 25), new Field(705, 350, 25, 25),
      new Field(760, 300, 25, 25), new Field(760, 350, 25, 25),
      new Field(790, 300, 25, 25), new Field(790, 350, 25, 25),
      new Field(820, 300, 25, 25), new Field(820, 350, 25, 25),
    ];
    fields.sort((a, b) => a.y - b.y || a.x - b.x);

    const bubbleMessages = [
      "Benvenuto! Qui fuori il mondo corre veloce, ma dentro questo recinto il tempo lo decidono le radici. Rilassati, non c'è fretta!",
      "Non serve avere il pollice verde, basta chiedere. Se una pianta ti preoccupa o non sai da dove iniziare, non disperare! Ci siamo noi!",
      "Siamo felici di averti tra i nostri! Se ti va, ogni giovedì ti mandiamo un piccolo pensiero per ricordarti di respirare e coltivare la tua curiosità!"
    ];

    let bubbleIndex = 0;
    let bubbleVisible = true;
    const BUBBLE_DISPLAY_MS = 6200; // duration of each message in ms

    // rect 
    function roundRect(ctx, x, y, w, h, r) {
      const radius = r || 6;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + w, y, x + w, y + h, radius);
      ctx.arcTo(x + w, y + h, x, y + h, radius);
      ctx.arcTo(x, y + h, x, y, radius);
      ctx.arcTo(x, y, x + w, y, radius);
      ctx.closePath();
    }

    // text split
    function wrapText(ctx, text, maxWidth) {
      const words = text.split(" ");
      const lines = [];
      let line = "";

      for (let n = 0; n < words.length; n++) {
        const testLine = line ? line + " " + words[n] : words[n];
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && line) {
          lines.push(line);
          line = words[n];
        } else {
          line = testLine;
        }
      }
      if (line) lines.push(line);
      return lines;
    }

    // draw bubble
    function drawBubble(ctx, text, px, py) {
      if (!bubbleVisible || !text) return;

      const padding = 10;
      const maxTextWidth = 280; 
      const fontSize = Math.round(10 * SPRITE_SCALE);
      ctx.font = `${fontSize}px Roboto, sans-serif`;
      ctx.textBaseline = "top";

      const lines = wrapText(ctx, text, maxTextWidth);
      const lineHeight = Math.round((fontSize + 4));
      
      let measuredWidth = 0;
      lines.forEach(l => {
        const w = ctx.measureText(l).width;
        if (w > measuredWidth) measuredWidth = w;
      });

      const bubbleW = Math.min(maxTextWidth, measuredWidth) + padding * 2;
      const bubbleH = lines.length * lineHeight + padding * 2;

    
      const spriteCenterOffsetX = (TILE_WIDTH * SPRITE_SCALE) / 2;
      const bx = px + spriteCenterOffsetX - bubbleW / 2;
      const by = py - bubbleH - 18; 

      // Background
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.96)";
      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 1;
      roundRect(ctx, bx, by, bubbleW, bubbleH, 10);
      ctx.fill();
      ctx.stroke();

      // tail bubble direction
      const tailX = px + spriteCenterOffsetX;
      const tailY = by + bubbleH;
      ctx.beginPath();
      ctx.moveTo(tailX - 8, tailY);
      ctx.lineTo(tailX + 8, tailY);
      ctx.lineTo(tailX, tailY + 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#1f2933";
      let textY = by + padding;
      const textX = bx + padding;
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], textX, textY);
        textY += lineHeight;
      }
      ctx.restore();
    }

    function startBubbleSequence() {
      bubbleIndex = 0;
      bubbleVisible = true;
      // it shows the 1st message immediately
      bubbleTimer = setInterval(() => {
        bubbleIndex++;
        if (bubbleIndex >= bubbleMessages.length) {
          clearInterval(bubbleTimer);
          bubbleTimer = null;
          bubbleVisible = false;
        }
      }, BUBBLE_DISPLAY_MS);
    }


    function allFieldsEmpty() {
      return fields.every((f) => f.state === Field.STATES.EMPTY);
    }

    function moveTowards(targetX, targetY, speedMultiplier = 1) {
      let dx = targetX - x;
      let dy = targetY - y;
      const dist = Math.hypot(dx, dy);

      if (dist < HARVEST_ARRIVAL_DIST) {
        x = targetX;
        y = targetY;
        return;
      }

      dx /= dist;
      dy /= dist;
      x += dx * BASE_SPEED * speedMultiplier;
      y += dy * BASE_SPEED * speedMultiplier;

      if (Math.abs(dx) > Math.abs(dy)) {
        direction = dx > 0 ? "right" : "left";
      } else {
        direction = dy > 0 ? "down" : "up";
      }
    }

    function findNearestGrownField(px, py) {
      let nearest = null;
      let bestDist = Infinity;
      for (const f of fields) {
        if (f.state === Field.STATES.GROWN) {
          const fx = f.x + f.width / 2;
          const fy = f.y + f.height / 2;
          const d = Math.hypot(fx - px, fy - py);
          if (d < bestDist) {
            bestDist = d;
            nearest = {
              field: f,
              dist: d,
              cx: fx - (TILE_WIDTH * SPRITE_SCALE - f.width) / 2,
              cy: fy - (TILE_HEIGHT * SPRITE_SCALE - f.height) / 2,
            };
          }
        }
      }
      return nearest;
    }

    function sowFieldInOrder() {
      if (sowingIndex >= fields.length) return;
      const field = fields[sowingIndex];
      const targetX = field.x - (TILE_WIDTH * SPRITE_SCALE - field.width) / 2;
      const targetY = field.y - (TILE_HEIGHT * SPRITE_SCALE - field.height) / 2;

      moveTowards(targetX, targetY);

      if (
        field.isPlayerOver(x, y, TILE_WIDTH * SPRITE_SCALE, TILE_HEIGHT * SPRITE_SCALE)
      ) {
        const randomCrop =
          cropTypes[Math.floor(Math.random() * cropTypes.length)];
        field.cropType = randomCrop;
        field.state = Field.STATES.PLANTED;
        field.timer = 0;
        sowingIndex++;
      }
    }

    const rainDrops = [];
    const snowFlakes = [];

    function initWeather() {
        rainDrops.length = 0;
        snowFlakes.length = 0;
        
      for (let i = 0; i < 120; i++) {
        rainDrops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          l: 10 + Math.random() * 10,
          s: 6 + Math.random() * 4,
        });
      }
      for (let i = 0; i < 100; i++) {
        snowFlakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 2 + Math.random() * 3,
          s: 0.5 + Math.random() * 1.5,
          drift: Math.random() * 0.5,
        });
      }
    }

    function checkWeather() {
      const weather = weatherRef.current; 

      if (weather === "rain") {

        for (const drop of rainDrops) {
          drop.y += drop.s;
          if (drop.y > canvas.height) {
            drop.y = -drop.l;
            drop.x = Math.random() * canvas.width;
          }
        }
        ctx.save();
        ctx.strokeStyle = "rgba(173,216,230,0.6)";
        ctx.lineWidth = 1;
        for (const drop of rainDrops) {
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x, drop.y + drop.l);
          ctx.stroke();
        }
        ctx.restore();
        applyWeatherOverlay(weather);
      } else if (weather === "snow") {
        for (const flake of snowFlakes) {
          flake.y += flake.s;
          flake.x += Math.sin(flake.y * 0.01) * flake.drift;
          if (flake.y > canvas.height) {
            flake.y = -flake.r;
            flake.x = Math.random() * canvas.width;
          }
        }
        ctx.save();
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        for (const flake of snowFlakes) {
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
        applyWeatherOverlay(weather);
      } else if (weather === "rainbow") {
        GROWTH_TICKS_PER_STAGE = 900;
        drawRainbow();
      }
      else {
        GROWTH_TICKS_PER_STAGE = 1300;
      }
    }

    function applyWeatherOverlay(currentWeather) {
      ctx.save();
      if (currentWeather === "rain") {
        GROWTH_TICKS_PER_STAGE = 20000;
        ctx.fillStyle = "rgba(136, 136, 136, 0.29)";
      } else if (currentWeather === "snow") {
        GROWTH_TICKS_PER_STAGE = 20000;
        ctx.fillStyle = "rgba(200, 200, 255, 0.2)";
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    function drawRainbow() {
      ctx.save();
      const centerX = 550;
      const centerY = canvas.height + 100;
      const innerRadius = 400;
      const outerRadius = 550;

      const gradient = ctx.createRadialGradient(
        centerX, centerY, innerRadius,
        centerX, centerY, outerRadius
      );

      gradient.addColorStop(0.0, "rgba(0,0,0,0)");
      gradient.addColorStop(0.12, "rgba(255, 0, 0, 0.4)");
      gradient.addColorStop(0.24, "rgba(255,165,0,0.4)");
      gradient.addColorStop(0.36, "rgba(255,255,0,0.4)");
      gradient.addColorStop(0.48, "rgba(0,255,0,0.4)");
      gradient.addColorStop(0.6, "rgba(0,127,255,0.4)");
      gradient.addColorStop(0.84, "rgba(179, 0, 255, 0.4)");
      gradient.addColorStop(1.0, "rgba(84, 0, 140, 0)");

      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    function update() {
      moveTimer++;
      const nearestGrown = findNearestGrownField(x, y);

      if (sowingMode) {
        if (sowingIndex >= fields.length) {
          sowingMode = false;
          sowingIndex = 0;
          moveTimer = 0;
        } else {
          sowFieldInOrder();
        }
      } else {
        if (nearestGrown && Math.random() < SEEK_GROWN_PROBABILITY) {
          moveTowards(
            nearestGrown.cx,
            nearestGrown.cy,
            HARVEST_SPEED_MULTIPLIER
          );
        } else {
          if (moveTimer > 480) {
            moveTimer = 0;
            const dirs = ["up", "down", "left", "right"];
            direction = dirs[Math.floor(Math.random() * dirs.length)];
          }

          switch (direction) {
            case "up": y -= BASE_SPEED; break;
            case "down": y += BASE_SPEED; break;
            case "left": x -= BASE_SPEED; break;
            case "right": x += BASE_SPEED; break;
          }

          if (allFieldsEmpty()) {
            sowingMode = true;
            sowingIndex = 0;
            fields.sort((a, b) => a.y - b.y || a.x - b.x);
          }
        }
      }

      frameTimer++;
      if (frameTimer >= frameInterval) {
        frameTimer = 0;
        frame = (frame + 1) % frameCount;
      }

      const minX = 250, maxX = 1100, minY = 265, maxY = 400;
      if (x < minX) { x = minX; direction = "right"; }
      else if (x > maxX) { x = maxX; direction = "left"; }
      if (y < minY) { y = minY; direction = "down"; }
      else if (y > maxY) { y = maxY; direction = "up"; }

      const hitboxW = TILE_WIDTH * SPRITE_SCALE + HARVEST_HITBOX_PADDING;
      const hitboxH = TILE_HEIGHT * SPRITE_SCALE + HARVEST_HITBOX_PADDING;

      fields.forEach((f) => {
        f.tryHarvest(x, y, hitboxW, hitboxH);
        f.update();
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
      fields.forEach((f) => f.draw(ctx));
      
      ctx.drawImage(
        sprites[direction],
        frame * TILE_WIDTH, 0, TILE_WIDTH, TILE_HEIGHT,
        x, y, TILE_WIDTH * SPRITE_SCALE, TILE_HEIGHT * SPRITE_SCALE
      );

      // draws bubble over character
      if (bubbleVisible && bubbleIndex < bubbleMessages.length) {
        drawBubble(ctx, bubbleMessages[bubbleIndex], x, y);
      }

      checkWeather();
    }

    initWeather();
    startBubbleSequence();
    const render = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (bubbleTimer) {
        clearInterval(bubbleTimer);
        bubbleTimer = null;
      }
    };
  }, []); 

  const setWeather = (type) => {
    weatherRef.current = type;
  };

  return (
    <div className={style.gameWindow}>
      <div className={style.canvasContainer}>
        <canvas ref={canvasRef} width="1100" height="600" />
       
        <div className={style.buttonsContainer}>
              <IconButton colors={colors} icon={<Sun
                                className={style.icon}
                                style={{ width: 20, height: 20,  }}
                               
                            /> }  onClick={() => setWeather("sun")}/>
              <IconButton colors={colors} icon={<Plant
                                className={style.icon}
                                style={{ width: 20, height: 20 }}
                            /> } onClick={() => setWeather("rainbow")} />
              <IconButton colors={colors} icon={<Rain
                                className={style.icon}
                                style={{ width: 20, height: 20 }}
                            /> } onClick={() => setWeather("rain")} />
              <IconButton colors={colors} icon={<Snow
                                className={style.icon}
                                style={{ width: 20, height: 20 }}
                            /> } onClick={() => setWeather("snow")} />
            </div>
      </div>
    </div>
  );
};

export default GameWindow;