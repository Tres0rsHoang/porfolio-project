import { IsString } from 'class-validator';

export class AuthCreatecommentDto {
  @IsString()
  content: string;
}
