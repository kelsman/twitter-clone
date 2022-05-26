import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponseType, FileService, Post } from '@project/core';
import { CreatePostDto } from '@project/dto';
import {
  PostDocument,
  PostEntity,
  UserDocument,
  UserEntity,
} from '@project/schemas';
import { Model } from 'mongoose';
import { from, map } from 'rxjs';

@Injectable()
export class AppService {
  private logger = new Logger('Post service');
  constructor(
    @InjectModel(PostEntity.name) private postRepo: Model<PostDocument>,
    @InjectModel(UserEntity.name) private userRepo: Model<UserDocument>,
    private fileService: FileService
  ) {}

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

  async findUserPosts(
    userId: string
  ): Promise<ApiResponseType<PostDocument[]>> {
    const posts = await this.postRepo
      .find({
        $match: {
          author: userId,
        },
      })
      .populate({
        path: 'author',
        model: this.userRepo,
        select: '-password -__v',
      })
      .sort({ createdAt: -1 });
    if (!posts) {
      return {
        status: HttpStatus.OK,
        message: 'No posts found',
        data: [],
      };
    }
    return {
      status: HttpStatus.OK,
      message: 'Posts found successfully',
      data: posts,
    };
  }

  async findAll() {
    const posts = await this.postRepo.find();
    if (!posts) {
      return {
        status: HttpStatus.OK,
        message: 'No posts found',
        data: [],
      };
    }
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: posts,
    };
  }

  /**
   * @dESCRIPTION HANDLES LIKE POST
   * @param userId
   */
  async likePost(userId: string, postId: string) {
    return from(
      this.postRepo.findOneAndUpdate(
        {
          _id: postId,
          likes: {
            $nin: [userId],
          },
        },
        {
          $push: {
            likes: userId,
          },
          $inc: {
            likesCount: 1,
          },
          $set: {
            userLikedPost: true,
          },
        },
        {
          returnDocument: 'after',
        }
      )
    ).pipe(
      map(async (post) => {
        await post.populate([
          {
            path: 'author',
            model: this.userRepo,
          },
          {
            path: 'likes',
            model: this.userRepo,
            select: '_id username',
          },
        ]);
        return {
          status: HttpStatus.OK,
          message: 'Success',
          data: post,
        };
      })
    );
  }

  /**
   * @dESCRIPTION HANDLES UNLIKE POST
   * @param userId
   */
  async unlikePost(userId: string, postId: string) {
    return from(
      this.postRepo.findOneAndUpdate(
        {
          _id: postId,
          likes: {
            $in: [userId],
          },
        },
        {
          $pull: {
            likes: userId,
          },
          $inc: {
            likesCount: -1,
          },
          $set: {
            userLikedPost: false,
          },
        },
        {
          returnDocument: 'after',
        }
      )
    ).pipe(
      map(async (post) => {
        await post.populate([
          {
            path: 'author',
            model: this.userRepo,
          },
          {
            path: 'likes',
            model: this.userRepo,
            select: '_id username',
          },
        ]);
        return {
          status: HttpStatus.OK,
          message: 'Success',
          data: post,
        };
      })
    );
  }
}
