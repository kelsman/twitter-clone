import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse, Post } from '@project/core';
import { CreatePostDto } from '@project/dto';
import {
  PostDocument,
  PostEntity,
  UserDocument,
  UserEntity,
} from '@project/schemas';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(PostEntity.name) private postRepo: Model<PostDocument>,
    @InjectModel(UserEntity.name) private userRepo: Model<UserDocument>
  ) {}
  async getData(userId: string) {
    return await this.postRepo.find({ author: userId }).populate({
      path: 'author',
      model: this.userRepo,
    });
  }

  async handleCreatPost(
    userId: string,
    body: CreatePostDto
  ): Promise<ApiResponse<Post>> {
    const newPost = await new this.postRepo({
      ...body,
      author: userId,
    }).save();

    if (!newPost) {
      throw new InternalServerErrorException();
    }
    await newPost.populate({
      path: 'author',
      model: this.userRepo,
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Post created successfully',
      data: newPost,
    };
  }
}
