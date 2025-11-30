import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TrainerDocument = HydratedDocument<Trainer>;

@Schema({ timestamps: true }) // Agrega createdAt y updatedAt automáticamente
export class Trainer {
  // Relación con el Usuario (Login)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  description: string; // Bio para el perfil

  @Prop([String]) 
  specialties: string[]; // Ej: ["Obediencia", "Cachorros", "Agility"]

  @Prop({ required: true })
  location: string; // Ciudad o Comuna para filtrar

  @Prop({ required: true })
  pricePerHour: number;

  @Prop({ default: 0 })
  rating: number; // 0 a 5 estrellas

  @Prop([String])
  images: string[]; // URLs de las fotos
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);