import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  ApiResponse,
  LogInUserResponse,
  RefreshTokenResponse,
} from '@project/core';
import { CreateUserDto, GoogleUserDto, LogInUserDto } from '@project/dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @description Log in user
   * @param body {LogInUserDto}
   * @returns {Promise<LogInUserResponse>}
   */
  @Post('/login')
  @ApiOperation({
    summary: 'Log in user',
  })
  @HttpCode(200)
  handleLogin(
    @Body() body: LogInUserDto
  ): Promise<ApiResponse<LogInUserResponse>> {
    return this.authService.loginUser(body);
  }

  /**
   * @description Register User
   * @param body {CreateUserDto}
   * @returns { Promise<ApiResponse<void>> }
   * @param body
   */
  @Post('signup')
  @ApiOperation({
    summary: 'Register user',
  })
  handleRegister(@Body() body: CreateUserDto): Promise<ApiResponse<void>> {
    return this.authService.registerUser(body);
  }

  @Post('/google/login')
  @ApiOperation({ summary: 'Log User in with Google OAuth2' })
  async googlelogin(@Body() user: GoogleUserDto) {
    return this.authService.loginGoogleUser(user);
  }

  @Get('email-exist')
  emailExist(@Body('email') email: string) {
    return this.authService.emailExist(email);
  }

  /**
   * @description  verify email
   * @param token
   */
  @Post('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  /**
   * @description  Refresh token
   * @queryParam token
   * @returns {Promise<ApiResponse<RefreshTokenResponse>>}
   */
  @Post('refresh-token')
  @ApiOperation({
    summary: 'Refresh token',
  })
  @ApiQuery({ name: 'token', required: true, description: 'refresh token' })
  @HttpCode(200)
  handleRefreshToken(
    @Query('token') token: string
  ): Promise<ApiResponse<RefreshTokenResponse>> {
    return this.authService.refreshToken(token);
  }

  @Post('validate-username')
  handleValidate(@Body('username') username: string) {
    return this.authService.usernameExist(username);
  }
}
