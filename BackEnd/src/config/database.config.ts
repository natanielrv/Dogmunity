// src/config/database.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class DatabaseConfig {
  constructor(private configService: ConfigService) {}

  getMongoConfig(): MongooseModuleOptions {
    return {
      uri: this.configService.get<string>('MONGODB_URI'),
    };
  }
}
