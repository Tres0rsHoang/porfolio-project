import { Optional } from '@nestjs/common';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Optional()
  company?: string;

  @IsBoolean()
  @IsNotEmpty()
  gender: boolean;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
