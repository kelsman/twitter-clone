import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiFile, AuthenticatedUser, JwtAuthGuard } from '@project/core';
import { CreateCommentDto } from '@project/dto';
import { CommentModel } from '@project/schemas';
import { CommentService } from '../services/comment.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Comment')
@ApiBearerAuth()
@Controller('post/comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @ApiFile()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create A Comment' })
  @ApiOkResponse({ type: CommentModel })
  create(
    @Query('postId') postId: string,
    @AuthenticatedUser() userId: string,
    @Body() body: CreateCommentDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.commentService.createComment(userId, postId, body, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A Comment' })
  delete(
    @AuthenticatedUser() userId: string,
    @Query('postId') postId: string,
    @Query('commentId') commentId: string
  ) {
    this.commentService.deleteComment(userId, postId, commentId);
  }
}
