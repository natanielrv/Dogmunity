import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

// Estados posibles de una reserva
export enum BookingStatus {
  PENDING = 'PENDING',     // Esperando confirmación
  CONFIRMED = 'CONFIRMED', // Agendada
  PAID = 'PAID',           // Pagada
  CANCELLED = 'CANCELLED'
}

@Schema({ timestamps: true })
export class Booking {
  
  // ... dentro de la clase Booking
  @Prop({ required: true })
  dogName: string; // <--- NUEVO CAMPO
  // ¿Quién contrata? (Dueño de la mascota)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: Types.ObjectId;

  // ¿A quién contratan? (Entrenador)
  @Prop({ required: true })
  trainerId: string;   // <--- Aceptará "1", "2" o lo que sea

  @Prop({ required: true })
  date: Date; // Fecha y hora de la cita

  @Prop({ default: 1 })
  durationHours: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);