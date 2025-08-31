import { IsNumber } from 'class-validator';

export default class LinkAccountDTO {
  @IsNumber()
  userId: number;
}
