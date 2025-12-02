import { IsEmail, IsNotEmpty } from 'class-validator';

export class CheckEmailDto {
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @IsEmail({}, { message: 'El formato del correo no es válido' })
  email: string;
}