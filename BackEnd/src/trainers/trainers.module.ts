import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';

@Module({
  imports: [], // ¡Vaciamos los imports de Mongoose!
  controllers: [TrainersController],
  providers: [TrainersService],
})
export class TrainersModule {}