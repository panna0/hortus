"use client"; // 1. Obbligatorio per usare Context e Hooks

import { useEffect, use } from 'react'; // 'use' è necessario in Next.js 15 per i params, altrimenti usa useParams
import { usePlants } from '../../../context/PlantContext'; // Assicurati che il percorso sia corretto

const Plant = ({ params }) => { 
  // 2. Sbustiamo i params. In Next.js 15 params è una Promise.
  // Se usi Next.js 14 o inferiore, puoi fare const { id } = params; senza 'use'
  const { id } = use(params); 

  // 3. Estraiamo funzioni e stato dal Context
  const { fetchPlantDetails, plantDetails, loading, error } = usePlants();

  // 4. Usiamo useEffect per chiamare l'API appena il componente viene montato o l'ID cambia
  useEffect(() => {
    if (id) {
      fetchPlantDetails(id);
    }
    // Nota: Aggiungiamo fetchPlantDetails alle dipendenze per correttezza, 
    // ma assicurati che la funzione in Context sia stabile (es. usando useCallback) o ignoralo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 5. Gestione degli stati di caricamento ed errore
  if (loading) return <div className="p-4">Caricamento dettagli pianta...</div>;
  if (error) return <div className="p-4 text-red-500">Errore: {error}</div>;
  
  // Se non abbiamo ancora i dettagli (es. primo render prima del fetch)
  if (!plantDetails) return null;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{plantDetails.common_name || plantDetails.scientific_name}</h1>
      
      {/* Esempio di visualizzazione dati */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plantDetails.image_url && (
            <img 
              src={plantDetails.image_url} 
              alt={plantDetails.common_name} 
              className="rounded-lg shadow-md max-w-full h-auto"
            />
        )}
        
        <div>
          <h2 className="text-xl font-semibold">Dettagli</h2>
          <ul className="list-disc pl-5 mt-2">
             <li><strong>Nome Scientifico:</strong> {plantDetails.scientific_name}</li>
             <li><strong>Famiglia:</strong> {plantDetails.family}</li>
             <li><strong>Genere:</strong> {plantDetails.genus}</li>
             {/* Aggiungi altri campi restituiti da Trefle */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Plant;