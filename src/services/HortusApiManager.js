import axios from "axios";

// URL base del tuo backend
const HORTUS_BASE_URL = "https://hortus-back.onrender.com";

const HortusApiManager = axios.create({
  baseURL: HORTUS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercettore per la risposta (gestione errori centralizzata)
HortusApiManager.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Errore API Hortus:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default HortusApiManager;