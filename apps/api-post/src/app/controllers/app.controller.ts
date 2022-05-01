import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser, JwtAuthGuard } from '@project/core';
import { CreatePostDto } from '@project/dto';
import { PostEntity } from '@project/schemas';
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

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The post has been successfully created.',
    type: PostEntity,
  })
  create(@AuthenticatedUser() userId: string, @Body() body: CreatePostDto) {
    return this.appService.handleCreatPost(userId, body);
  }
}
