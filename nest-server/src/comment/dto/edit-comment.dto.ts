import { IsString } from 'class-validator';

export default class CommentEditDto {
  @IsString()
  content: string;
}
