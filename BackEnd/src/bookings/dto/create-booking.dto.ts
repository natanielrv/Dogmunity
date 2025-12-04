import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  ownerId: string; // ID del dueño (tú)

  @IsString()
  @IsNotEmpty()
  trainerId: string; // ID del entrenador

  @IsDateString()
  @IsNotEmpty()
  date: string; // Fecha de la cita (ISO format)

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  durationHours: number;

  dogName: string; // <--- NUEVO CAMPO
}
