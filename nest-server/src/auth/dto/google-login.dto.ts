import { IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  code: string;

  state?: string;
}
