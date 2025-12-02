import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/schemas/dto/create-user.dto';
import { CheckEmailDto } from './dto/verificacion-mail.dto'; // Tu DTO de solo email

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    // Eliminé 'existingUsers' del constructor, no lo necesitas con BD real.
  ) {}

  // --- NUEVA FUNCIÓN PARA EL PASO 1 (Check Email) ---
  async processEmail(checkEmailDto: CheckEmailDto) {
    const { email } = checkEmailDto;
    
    // Usamos tu servicio real para buscar en la BD
    const user = await this.usersService.findByEmail(email);
    
    // Si 'user' tiene datos, existe. Si es null/undefined, no existe.
    const exists = !!user; 

    return {
      status: 'success',
      exists: exists,
      // Si existe, lo mandamos a login. Si no, a registro.
      nextStep: exists ? 'login' : 'register', 
      message: exists 
        ? 'Usuario encontrado, solicita contraseña' 
        : 'Usuario no encontrado, solicita registro'
    };
  }
  // --------------------------------------------------

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject ? user.toObject() : user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { email: user.email, sub: user.id || user._id, role: user.role };

    return {
      user: {
        id: user.id || user._id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const createUserDto: CreateUserDto = {
      name: registerDto.name,
      lastName: registerDto.lastName,
      email: registerDto.email,
      password: registerDto.password,
    };

    const newUser = await this.usersService.create(createUserDto);
    const user = newUser.toObject ? newUser.toObject() : newUser;
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