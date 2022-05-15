import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponseType, FileService } from '@project/core';
import { CreateCommentDto } from '@project/dto';
import {
  CommentDocument,
  CommentModel,
  PostDocument,
  PostEntity,
  UserDocument,
  UserEntity,
} from '@project/schemas';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  private logger = new Logger('Comment service');
  constructor(
    @InjectModel(CommentModel.name) private commentRepo: Model<CommentDocument>,
    @InjectModel(PostEntity.name) private postRepo: Model<PostDocument>,
    @InjectModel(UserEntity.name) private userRepo: Model<UserDocument>,
    private fileService: FileService
  ) {}

  async createComment(
    userId: string,
    postId: string,
    body: CreateCommentDto,
    file: Express.Multer.File
  ): Promise<ApiResponseType<CommentDocument>> {
    this.logger.log(userId);
    const post = this.postRepo.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const newComment = new this.commentRepo({
      content: body.content,
      author: userId,
      post: postId,
    });
    if (file) {
      const fileDetails = await this.fileService.uploadPublicFile(
        file.buffer,
        file.originalname
      );
      newComment.media.push(fileDetails);
    }

    await newComment.save();
    if (!newComment) {
      throw new InternalServerErrorException();
    }
    await this.postRepo.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 },
    });

    await newComment.populate([
      {
        path: 'author',
        model: this.userRepo,
        select: 'username _id name',
      },
      {
        path: 'post',
        model: this.postRepo,
        select: '-__v ',
      },
    ]);

    return {
      status: HttpStatus.CREATED,
      message: 'Success',
      data: newComment,
    };
  }

  async deleteComment(
    userId: string,
    commentId: string,
    postId: string
  ): Promise<ApiResponseType<void>> {
    // check user is owner of comment
    const commentOwner = this.commentRepo.findOne({
      author: userId,
    });
    if (!commentOwner) {
      throw new BadRequestException('Comment not found');
    }

    await this.commentRepo.findByIdAndDelete(commentId);
    await this.postRepo.findByIdAndUpdate(commentId, {
      $inc: { commentsCount: -1 },
    });

    return {
      status: HttpStatus.OK,
      message: 'Success',
    };
  }
}
