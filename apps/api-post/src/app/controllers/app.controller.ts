import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiFile, AuthenticatedUser, JwtAuthGuard } from '@project/core';
import { CreatePostDto } from '@project/dto';
import { PostEntity } from '@project/schemas';
import 'multer';
import { AppService } from '../services/app.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Post')
@ApiBearerAuth()
@Controller('post')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@AuthenticatedUser() userId: string) {
    return this.appService.getData(userId);
  }

  @Get(':id')
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
  create(
    @UploadedFile() file: Express.Multer.File,
    @AuthenticatedUser() userId: string,
    @Body() body: CreatePostDto
  ) {
    return this.appService.handleCreatPost(userId, body, file);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @AuthenticatedUser() userId: string) {
    return this.appService.deletePost(id, userId);
  }
}
