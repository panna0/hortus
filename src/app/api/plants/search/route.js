// app/api/plants/search/route.js
import { NextResponse } from 'next/server';
import PlantApiManager from '../../../../services/PlantApiManager'; // Aggiorna il percorso se necessario

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 1;
  const query = searchParams.get('q') || '';

  try {
    let endpoint = 'plants';
    const params = { page };

    if (query) {
      endpoint = 'plants/search';
      params.q = query;
    }

    // Qui il nostro server chiama Trefle (nessun CORS!)
    const response = await PlantApiManager.get(endpoint, { params });
    
    // Restituiamo i dati al nostro client
    return NextResponse.json(response.data);

  } catch (error) {
    return NextResponse.json(
      { message: 'Errore nel proxy API Trefle (search)' },
      { status: 500 }
    );
  }
}