import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LogInUserDto } from '@twitter-clone/Dto';
import { AuthService } from './auth.service';

console.log(CreateUserDto);

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Log in user',
  })
  handleLogin(@Body() body: LogInUserDto) {
    return this.authService.loginUser(body);
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Register user',
  })
  handleRegister(@Body() body: CreateUserDto) {
    return this.authService.registerUser(body);
  }

  @Get('email-exist')
  emailExist(@Body('email') email: string) {
    return this.authService.emailExist(email);
  }

  @Post('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}
