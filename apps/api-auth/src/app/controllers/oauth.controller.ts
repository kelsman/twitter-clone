import { Controller, Get, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from '@twitter-clone/core';
import { OAuthService } from '../services/oauth.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@ApiTags('OAuth')
@Controller('auth')
export class OAuthController {
  constructor(
    private OAuthService: OAuthService,
    private configService: ConfigService
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth' })
  async handleGoogleAuth(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth Redirect' })
  async handleGoogleAuthRedirect(@Req() req, @Res() res: Response) {
    return this.OAuthService.googleAuthRedirect(req).then(() => {
      res.status(200).send('Success');
    });
  }
}
