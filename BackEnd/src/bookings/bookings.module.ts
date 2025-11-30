import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <-- IMPORTANTE
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking, BookingSchema } from './entities/booking.entity';

@Module({
  imports: [
    // Registramos el esquema aquí
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
