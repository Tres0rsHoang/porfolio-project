import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsBoolean()
  feature?: boolean;

  @IsArray()
  @IsString({ each: true })
  framework: string[];

  @Transform(({ value }: { value: string }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  startAt: Date;

  @Optional()
  @Transform(({ value }: { value: string }) => new Date(value))
  @IsDate()
  endAt: Date;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
