import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from '@twitter-clone/core';
import { Response } from 'express';
import { catchError, from, map } from 'rxjs';
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
    return from(this.OAuthService.googleAuthRedirect(req)).pipe(
      catchError((error) => {
        Logger.error(
          'Error in OAuthController.handleGoogleAuthRedirect',
          error
        );
        throw new InternalServerErrorException();
      }),
      map(({ data }) => {
        return res.redirect(
          `${environment.CLIENT_URL}/auth/?access_token=${data.access_token}refresh_token=${data.refresh_token}`
        );
      })
    );
    // .then(({ data }) => {
    //   res.redirect(
    //     `${environment.CLIENT_URL}/auth/i/flow/google?access_token=${data.access_token}refresh_token=${data.refresh_token}`
    //   );
    // });
  }
}
