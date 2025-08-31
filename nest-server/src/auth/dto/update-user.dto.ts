import { OmitType, PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';

export class userUpdateDto extends PartialType(
  OmitType(RegisterDto, ['username', 'password'] as const),
) {}
