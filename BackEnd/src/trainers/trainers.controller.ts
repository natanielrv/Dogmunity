import { Controller, Get, Param, Query } from '@nestjs/common';
import { TrainersService } from './trainers.service';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  // GET /trainers
  // Devuelve todos
  @Get()
  getAll() {
    return this.trainersService.findAll();
  }

  // GET /trainers/search?location=valpo&maxPrice=20000
  // Buscador
  @Get('search')
  searchTrainers(
    @Query('location') location: string,
    @Query('maxPrice') maxPrice: string,
  ) {
    // Convertimos el precio a número porque por URL llega como texto
    const priceNumber = maxPrice ? Number(maxPrice) : undefined;
    return this.trainersService.search(location, priceNumber);
  }

  // GET /trainers/1
  // Perfil individual
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.trainersService.findOne(+id);
  }
}