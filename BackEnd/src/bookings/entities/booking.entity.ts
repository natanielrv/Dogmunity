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
  
  // ¿Quién contrata? (Dueño de la mascota)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: Types.ObjectId;

  // ¿A quién contratan? (Entrenador)
  @Prop({ type: Types.ObjectId, ref: 'Trainer', required: true })
  trainerId: Types.ObjectId;

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