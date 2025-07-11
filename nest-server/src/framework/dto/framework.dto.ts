import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFrameworksDto {
  frameworks: CreateFrameworkDto[];
}

export class CreateFrameworkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  languages: string;
}

export class UpdateFrameworkDto extends PartialType(CreateFrameworkDto) {}
