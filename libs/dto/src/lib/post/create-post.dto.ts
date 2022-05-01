import { OmitType } from '@nestjs/swagger';
import { PostEntity } from '@project/schemas';

export class CreatePostDto extends OmitType(PostEntity, [
  '_id',
  'createdAt',
  'updatedAt',
  '__v',
  'author',
]) {}
