import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // Suponiendo que usas variables de entorno

// Módulos de tu aplicación
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TrainersModule } from './trainers/trainers.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    // Configuración de variables de entorno (lee el archivo .env)
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexión a la Base de Datos (Asegúrate que la URI esté en tu .env)
    MongooseModule.forRoot(process.env.DB_URI || 'mongodb://localhost:27017/dogmunity'),

    // Tus Features
    AuthModule,
    UsersModule,
    TrainersModule,
    BookingsModule,
  ],
  controllers: [], // Ya no hay AppController
  providers: [],   // Ya no hay AppService
})
export class AppModule {}