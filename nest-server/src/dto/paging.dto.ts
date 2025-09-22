import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class PagingDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(10)
  limit?: number = 10;
}

export class ProjectPagingDto extends PagingDto {
  @IsOptional()
  @IsString()
  projectName?: string;
}
