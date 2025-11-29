// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/schemas/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Accedemos a la propiedad id en lugar de _id
    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    // Creamos un objeto CreateUserDto explícitamente para asegurar compatibilidad de tipos
    const createUserDto: CreateUserDto = {
      name: registerDto.name,
      lastName: registerDto.lastName,
      email: registerDto.email,
      password: registerDto.password,
    };

    // Pasamos el DTO correcto al servicio de usuarios
    const newUser = await this.usersService.create(createUserDto);

    // Convertimos a un objeto plano para manejar las propiedades correctamente
    const user = newUser.toObject ? newUser.toObject() : newUser;

    // Usamos id en lugar de _id
    const userId = user.id || user._id?.toString();

    const payload = {
      email: user.email,
      sub: userId,
      role: user.role,
    };

    return {
      user: {
        id: userId,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async me(userId: string) {
    return this.usersService.findOne(userId);
  }
}
