import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@twitter-clone/Dto';
import { AuthService } from './auth.service';

console.log(CreateUserDto);
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getData() {
    return this.authService.getData();
  }

  @Post('/login')
  handleLogin() {
    return 'this is the login endpoint';
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Register user',
  })
  register(@Body() body: CreateUserDto) {
    return this.authService.registerUser(body);
  }

  @Get('email-exist')
  emailExist(@Body('email') email: string) {
    return this.authService.emailExist(email);
  }

  @Post('verify-email')
  verifyEmail(@Query('token') token: string ){
    return this.authService.verifyEmail(token)
  }
}
