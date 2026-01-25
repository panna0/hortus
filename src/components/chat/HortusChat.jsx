import React, { useState, useEffect, useRef } from 'react';
import './HortusChat.css';

const CHAT_API_URL = 'https://hortus-back.onrender.com/api/chat';

// --------- ICONE DA CAMBIARE -----------
// 1. Foglia Semplice (Senza freccia)
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="chat-icon-svg">
    <path d="M11.9998 3C11.9998 3 13.3331 9.66667 20.9998 11.9994C21.0003 12.0001 21.0008 12.0008 21.0008 12.0017C21.0008 12.0025 21.0003 12.0033 20.9998 12.0039C13.3331 14.3367 11.9998 21 11.9998 21C11.9998 21 10.6664 14.3367 2.99976 12.0039C2.99923 12.0033 2.99878 12.0025 2.99878 12.0017C2.99878 12.0008 2.99923 12.0001 2.99976 11.9994C10.6664 9.66667 11.9998 3 11.9998 3Z" />
  </svg>
);

// 2. Icona Espandi (Fullscreen)
const MaximizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="chat-icon-svg small">
    <path fillRule="evenodd" d="M3.25 3.25a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0V4.75h2.75a.75.75 0 000-1.5H3.25zm0 10a.75.75 0 00.75.75h2.75a.75.75 0 000-1.5H4.75v-2.75a.75.75 0 00-1.5 0v3.5zm13.5-9.25a.75.75 0 00-.75-.75h-3.5a.75.75 0 000 1.5h2.75v2.75a.75.75 0 001.5 0V4a.75.75 0 00-.75-.75zm0 10a.75.75 0 00.75-.75v-3.5a.75.75 0 00-1.5 0v2.75h-2.75a.75.75 0 000 1.5h3.5z" clipRule="evenodd" />
  </svg>
);

// 3. Icona Riduci (Exit Fullscreen)
const MinimizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="chat-icon-svg small">
     <path fillRule="evenodd" d="M3.25 7.5a.75.75 0 001.5 0V4.75h2.75a.75.75 0 000-1.5H4a.75.75 0 00-.75.75v3.5zm13.5-3.5a.75.75 0 00-1.5 0v2.75h-2.75a.75.75 0 000 1.5h3.5a.75.75 0 00.75-.75V4zM4.75 16.75a.75.75 0 000-1.5H7.5a.75.75 0 000-1.5H4a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-2.75zm12 0a.75.75 0 000-1.5h-2.75v-2.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.75.75H16.75z" clipRule="evenodd" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="chat-icon-svg small">
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="chat-icon-svg">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);
// ------------------------------------------

const TypingMessage = ({ text, onFinished }) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    // Se il testo è vuoto, non fare nulla
    if (!text) return;

    setTypedText(''); // Inizia vuoto
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setTypedText(prev => prev + text.charAt(i));
        i++;
      } else {
        // Finito di scrivere
        clearInterval(typingInterval);
        if (onFinished) onFinished(); // Segnala al genitore che abbiamo finito
      }
    }, 25); // Velocità di battitura (in ms)

    // Cleanup
    return () => clearInterval(typingInterval);
  }, [text, onFinished]); // Si ri-attiva solo se il testo cambia

  return <span>{typedText}</span>;
};

const HortusChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);
  const isInitialMount = useRef(true);

  // 1. Carica la cronologia dal sessionStorage all'avvio
  useEffect(() => {
    try {
      const storedMessages = sessionStorage.getItem('hortusChatHistory');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([
          {
            role: 'assistant',
            content: "Ciao! Sono Hortus, il tuo assistente di giardinaggio. Chiedimi qualsiasi cosa sulle tue piante!"
          }
        ]);
      }
    } catch (error) {
      console.error("Impossibile caricare la cronologia chat:", error);
      sessionStorage.removeItem('hortusChatHistory');
    }
  }, []);

  // 2. Salva la cronologia nel sessionStorage ogni volta che cambia
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    try {
      sessionStorage.setItem('hortusChatHistory', JSON.stringify(messages));
    } catch (error) {
      console.error("Impossibile salvare la cronologia chat:", error);
    }
  }, [messages]);

  // 3. Scrolla automaticamente alla fine della chat
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]); 

  // --- GESTORI DI EVENTI ---

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const handleSubmit = async (e) => {
    // Preveniamo il comportamento di default se 'e' esiste (es. da onKeyDown)
    if (e) e.preventDefault(); 
    
    const userInput = inputValue.trim();
    if (!userInput) return; 

    const newUserMessage = { role: 'user', content: userInput };
    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiMessages = updatedMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) throw new Error(`Errore API: ${response.statusText}`);

      const aiResponse = await response.json();
      
      // Aggiungi un flag 'isTyping' per attivare l'animazione
      const newAiMessage = { ...aiResponse, isTyping: true };
      setMessages(prevMessages => [...prevMessages, newAiMessage]);

    } catch (error) {
      console.error("Errore nella chiamata API della chat:", error);
      setMessages(prevMessages => [...prevMessages, {
        role: 'assistant',
        content: "Oh, scusa. Sembra che ci sia un problema di connessione. Riprova tra poco."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypingFinished = (index) => {
    setMessages(prevMessages => {
      // Creiamo una nuova copia dell'array
      const newMessages = [...prevMessages];
      // Creiamo una nuova copia dell'oggetto messaggio
      const finishedMessage = { ...newMessages[index], isTyping: false };
      // Sostituiamo il messaggio
      newMessages[index] = finishedMessage;
      return newMessages;
    });
  };

  const handleKeyDown = (e) => {
    // 1. Logica Freccia Su
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      // Trova l'ultimo messaggio inviato dall'utente
      const lastUserMessage = messages.filter(m => m.role === 'user').pop();
      if (lastUserMessage) {
        setInputValue(lastUserMessage.content);
      }
    }
    
    // 2. Logica Shift+Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Impedisce di andare a capo
      handleSubmit(e); // Invia il messaggio
    }
    // Se preme Enter + Shift, non fa nulla (comportamento di default: va a capo)
  };


  // --- RENDER ---
  if (!isOpen) {
    // STATO CHIUSO (Cerchio)
    return (
      <button
        onClick={toggleOpen} // Questo imposta isOpen = true
        className="hortus-chat-button"
        aria-label="Apri chat Hortus"
      >
        <LeafIcon />
      </button>
    );
  }

  // Altrimenti, mostra la finestra della chat
  // STATO APERTO (Rettangolo Chat)
  return (
    // Aggiungiamo la classe 'fullscreen' se lo stato è true
    <div className={`hortus-chat-window ${isFullscreen ? 'fullscreen' : ''}`}>
      
      <header className="chat-header">
        <h3 className="chat-title">Hortus Chat</h3>
        
        {/* Gruppo di bottoni header */}
        <div className="header-actions">
          
          {/* Bottone Fullscreen */}
          <button 
            onClick={toggleFullscreen} 
            className="chat-header-btn" 
            aria-label={isFullscreen ? "Riduci" : "Espandi"}
          >
            {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </button>

          {/* Bottone Chiudi */}
          <button 
            onClick={toggleOpen} 
            className="chat-header-btn" 
            aria-label="Chiudi chat"
          >
            <CloseIcon />
          </button>
        </div>
      </header>

      <div ref={chatBodyRef} className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role === 'user' ? 'user' : 'assistant'}`}>
            {msg.role === 'assistant' && msg.isTyping ? (
              <TypingMessage 
                text={msg.content} 
                onFinished={() => handleTypingFinished(index)} 
              />
            ) : msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="chat-message assistant loading">
            <span>Hortus sta pensando...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Chiedi a Hortus..."
          className="chat-input"
          disabled={isLoading}
          rows="1"
        />
        <button type="submit" className="chat-send-btn" disabled={isLoading} aria-label="Invia">
          <SendIcon />
        </button>
      </form>

    </div>
  );
};

export default HortusChat;