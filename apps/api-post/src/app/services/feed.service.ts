import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PostDocument,
  PostEntity,
  UserDocument,
  UserEntity,
} from '@project/schemas';
import { Model } from 'mongoose';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(PostEntity.name) private postRepo: Model<PostDocument>,
    @InjectModel(UserEntity.name) private userRepo: Model<UserDocument>
  ) {}

  async findUserFeeds() {}
}
