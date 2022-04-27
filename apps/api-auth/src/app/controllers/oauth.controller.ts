import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from '@project/core';
import { Response } from 'express';
import { environment } from '../../environments/environment';
import { OAuthService } from '../services/oauth.service';

@ApiTags('OAuth')
@Controller('auth')
export class OAuthController {
  constructor(private OAuthService: OAuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth' })
  async handleGoogleAuth(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth Redirect' })
  async handleGoogleAuthRedirect(@Req() req, @Res() res: Response) {
    const resVal = await this.OAuthService.googleAuthRedirect(req);
    console.log('resVal', resVal);

    return res.redirect(
      `${environment.CLIENT_URL}/auth?access_token=${resVal.data.access_token}&&refresh_token=${resVal.data.refresh_token}`
    );
  }
}
