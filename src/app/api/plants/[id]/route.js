// app/api/plants/[id]/route.js
import { NextResponse } from 'next/server';
import PlantApiManager from '../../../../services/PlantApiManager'; // Aggiorna il percorso

export async function GET(request, { params }) {
  const { id } = params; // L'ID dalla URL (es. /api/plants/123)

  if (!id) {
    return NextResponse.json({ message: 'ID mancante' }, { status: 400 });
  }

  try {
    // Qui il nostro server chiama Trefle
    const response = await PlantApiManager.get(`plants/${id}`);
    
    // Restituiamo i dati al nostro client
    return NextResponse.json(response.data);

  } catch (error) {
    return NextResponse.json(
      { message: 'Errore nel proxy API Trefle (details)' },
      { status: 500 }
    );
  }
}