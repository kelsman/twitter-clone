import { OmitType } from '@nestjs/swagger';
import { CommentModel } from '@project/schemas';

export class CreateCommentDto extends OmitType(CommentModel, [
  'createdAt',
  'updatedAt',
  '__v',
  'author',
]) {}
