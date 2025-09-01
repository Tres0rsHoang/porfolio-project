import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFrameworksDto {
  frameworks: CreateFrameworkDto[];
}

export class CreateFrameworkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  languages: string[];
}

export class UpdateFrameworkDto extends PartialType(CreateFrameworkDto) {}
