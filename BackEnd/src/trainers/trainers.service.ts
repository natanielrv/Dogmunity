import { Injectable } from '@nestjs/common';
import { TRAINERS_MOCK } from './trainers.mock'; // Importamos la lista

@Injectable()
export class TrainersService {
  
  // 1. Obtener todos (Para el Home)
  findAll() {
    return TRAINERS_MOCK;
  }

  // 2. Buscar con filtros (El corazón de tu feature)
  search(location?: string, maxPrice?: number) {
    let results = TRAINERS_MOCK;

    // Filtro 1: Cercanía (Por ciudad exacta en este prototipo)
    if (location) {
      // Convertimos a minúsculas para que "Viña" encuentre "viña del mar"
      const term = location.toLowerCase();
      results = results.filter(t => t.location.toLowerCase().includes(term));
    }

    // Filtro 2: Precio (Mostrar solo los que cuesten MENOS que el maxPrice)
    if (maxPrice) {
      results = results.filter(t => t.price <= maxPrice);
    }

    return results;
  }

  // 3. Obtener uno solo (Para ver perfil detallado)
  findOne(id: number) {
    return TRAINERS_MOCK.find(t => t.id === Number(id));
  }
}