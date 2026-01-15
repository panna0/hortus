'use client'; 

import React, { useEffect, useRef } from "react";
import style from "./GameWindow.module.scss";
import IconButton from "../iconButton/IconButton.jsx";
import Sun from "../../../public/pixelSun.svg";
import Plant from "../../../public/pixelPlant.svg";
import Rain from "../../../public/pixelRain.svg";
import Snow from "../../../public/pixelSnow.svg";

// --- CONFIGURAZIONE COSTANTI (Globali al modulo) ---
const TILE_WIDTH = 16;
const TILE_HEIGHT = 32;
const SPRITE_SCALE = 1.5;
const BASE_SPEED = 0.25;

const GROWTH_TICKS_PER_STAGE = 900;
const SEEK_GROWN_PROBABILITY = 0.03;
const HARVEST_SPEED_MULTIPLIER = 1.6;
const HARVEST_ARRIVAL_DIST = 2;
const HARVEST_HITBOX_PADDING = 6;

// --- CLASSI DEFINITE FUORI DAL COMPONENTE ---

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

// --- COMPONENTE REACT ---

const GameWindow = () => {
  const canvasRef = useRef(null);
  const weatherRef = useRef("rainbow");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // --- ASSETS E INIT ---
    // Carichiamo le immagini qui dentro per sicurezza (evita problemi SSR)
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

    // --- STATO DEL GIOCO LOCALE ---
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

    // Inizializzazione Campi
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

    // --- FUNZIONI LOGICHE ---

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

    // --- LOGICA METEO ---
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
        drawRainbow();
      }
    }

    function applyWeatherOverlay(currentWeather) {
      ctx.save();
      if (currentWeather === "rain") {
        ctx.fillStyle = "rgba(136, 136, 136, 0.29)";
      } else if (currentWeather === "snow") {
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

    // --- GAME LOOP ---
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
      
      // Draw Borders
     

      // Draw Character
      ctx.drawImage(
        sprites[direction],
        frame * TILE_WIDTH, 0, TILE_WIDTH, TILE_HEIGHT,
        x, y, TILE_WIDTH * SPRITE_SCALE, TILE_HEIGHT * SPRITE_SCALE
      );

      checkWeather();
    }

    // Avvio
    initWeather();
    const render = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
              <IconButton icon={<Sun
                                className={style.icon}
                                style={{ width: 20, height: 20 }}
                               
                            /> }  onClick={() => setWeather("sun")}/>
              <IconButton icon={<Plant
                                className={style.icon}
                                style={{ width: 20, height: 20 }}
                            /> } onClick={() => setWeather("rainbow")} />
              <IconButton icon={<Rain
                                className={style.icon}
                                style={{ width: 20, height: 20 }}
                            /> } onClick={() => setWeather("rain")} />
              <IconButton icon={<Snow
                                className={style.icon}
                                style={{ width: 20, height: 20 }}
                            /> } onClick={() => setWeather("snow")} />
            </div>
      </div>
    </div>
  );
};

export default GameWindow;