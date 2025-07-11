import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateLanguageDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  displayStrings: string[];
}
