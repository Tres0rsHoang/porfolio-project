import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @Optional()
  email?: string;

  @Optional()
  username?: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
