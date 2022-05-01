import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiResponse,
  AuthenticatedUser,
  AuthUser,
  JwtAuthGuard,
} from '@project/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@ApiTags('User')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@AuthenticatedUser() userId: string) {
    return this.appService.getProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  handleUpdate(
    @Body('username' as keyof AuthUser) username: string,
    @AuthenticatedUser() user: string
  ): Observable<ApiResponse<AuthUser>> {
    return this.appService.updateUsername(user, username);
  }
}
