import { OmitType } from '@nestjs/swagger';
import { PostEntity } from '@project/schemas';

export class CreatePostDto extends OmitType(PostEntity, [
  'createdAt',
  'updatedAt',
  '__v',
  'author',
]) {}
