

import axios from "axios";


const TREFLE_API_KEY = process.env.TREFLE_API_KEY; 
const TREFLE_BASE_URL = "https://trefle.io/api/v1/";

if (!TREFLE_API_KEY) {
  console.error("Chiave API Trefle (TREFLE_API_KEY) non trovata nelle variabili d'ambiente del server");
}

const PlantApiManager = axios.create({
  baseURL: TREFLE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


PlantApiManager.interceptors.request.use((config) => {
  config.params = {
    ...config.params, 
    token: TREFLE_API_KEY,
  };
  return config;
});

PlantApiManager.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Errore API Trefle (lato server):", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default PlantApiManager;