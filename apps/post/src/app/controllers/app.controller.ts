import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiFile,
  ApiResponseType,
  AuthenticatedUser,
  JwtAuthGuard,
} from '@project/core';
import { CreatePostDto } from '@project/dto';
import { PostDocument, PostEntity } from '@project/schemas';
import 'multer';
import { AppService } from '../services/app.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Post')
@ApiBearerAuth()
@Controller('post')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('feed')
  @ApiOperation({ summary: 'Get All Posts By Logged in user' })
  @ApiOkResponse({ type: PostEntity, isArray: true })
  findPosts(
    @AuthenticatedUser() userId: string
  ): Promise<ApiResponseType<PostDocument[]>> {
    return this.appService.findUserPosts(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Post By Id' })
  @ApiOkResponse({ type: PostEntity })
  findOne(@Param('id') id: string) {
    return this.appService.findOne(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The post has been successfully created.',
    type: PostEntity,
  })
  @ApiConsumes('multipart/form-data')
  @ApiFile('file', false)
  @ApiOperation({ summary: 'Create A Post' })
  create(
    @UploadedFile() file: Express.Multer.File,
    @AuthenticatedUser() userId: string,
    @Body() body: CreatePostDto
  ) {
    return this.appService.handleCreatPost(userId, body, file);
  }

  @Patch('like')
  @ApiOperation({ summary: 'Like A Post' })
  @ApiOkResponse({ type: PostEntity })
  likePost(
    @AuthenticatedUser() userId: string,
    @Query('postId') postId: string
  ) {
    return this.appService.likePost(userId, postId);
  }

  @Patch('unlike')
  @ApiOperation({ summary: 'Unlike A Post' })
  @ApiOkResponse({ type: PostEntity })
  unlikePost(
    @AuthenticatedUser() userId: string,
    @Query('postId') postId: string
  ) {
    return this.appService.unlikePost(userId, postId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Post By Id' })
  delete(@Param('id') id: string, @AuthenticatedUser() userId: string) {
    return this.appService.deletePost(id, userId);
  }
}
