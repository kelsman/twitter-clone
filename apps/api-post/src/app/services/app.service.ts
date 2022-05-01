import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponseType, Post } from '@project/core';
import { CreatePostDto } from '@project/dto';
import {
  PostDocument,
  PostEntity,
  UserDocument,
  UserEntity,
} from '@project/schemas';
import { FileService } from 'libs/core/src/lib/services/file.service';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(PostEntity.name) private postRepo: Model<PostDocument>,
    @InjectModel(UserEntity.name) private userRepo: Model<UserDocument>,
    private fileService: FileService
  ) {}

  async getData(userId: string) {
    return await this.postRepo.find({ author: userId }).populate({
      path: 'author',
      model: this.userRepo,
    });
  }

  async findOne(id: string): Promise<ApiResponseType<Post>> {
    const post = await this.postRepo.findById(id).populate({
      path: 'author',
      model: this.userRepo,
      select: 'username _id',
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Post found successfully',
      data: post,
    };
  }

  async handleCreatPost(
    userId: string,
    body: CreatePostDto,
    file: Express.Multer.File
  ): Promise<ApiResponseType<Post>> {
    const newPost = new this.postRepo({
      ...body,
      author: userId,
    });

    if (file) {
      const fileDetails = await this.fileService.uploadPublicFile(
        file.buffer,
        file.originalname
      );
      newPost.postMedia = [
        {
          ...fileDetails,
        },
      ];
    }

    await newPost.save();

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

  async deletePost(postId: string, userId: string) {
    const postToDelete = await this.postRepo.findById(postId);
    if (!postToDelete) {
      throw new NotFoundException('Post not found');
    }

    if (postToDelete.author.toString() !== userId) {
      throw new BadRequestException(
        'You are not authorized to delete this post'
      );
    }

    if (postToDelete.postMedia.length > 0) {
      Promise.all(
        postToDelete.postMedia.map(async ({ key }) => {
          await this.fileService.deletePublicFile(key);
        })
      );
    }

    await postToDelete.remove();
    return {
      status: HttpStatus.OK,
      message: 'Post deleted successfully',
    };
  }
}
