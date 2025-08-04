import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectTypeDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  name: string[];
}
