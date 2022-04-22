import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse, GoogleLoginResponse } from '@project/core';
import { GoogleUserDocument, GoogleUserEntity } from '@project/schemas';
import { Model } from 'mongoose';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class OAuthService {
  constructor(
    @InjectModel(GoogleUserEntity.name)
    private googleUserRepo: Model<GoogleUserDocument>,
    private authService: AuthService
  ) {}

  async googleAuthRedirect(req): Promise<ApiResponse<GoogleLoginResponse>> {
    {
      if (!req.user) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      const user = req.user;
      console.log(req.user);

      //check is account is saved to database or not
      const existingUser = await this.googleUserRepo.findOne({
        email: user.email,
      });
      console.log(existingUser);
      if (existingUser) {
        const access_token = await this.authService.generateToken(
          existingUser._id,
          environment.JWT_ACCESS_EXPIRES_IN
        );
        const refresh_token = await this.authService.generateToken(
          existingUser._id,
          environment.JWT_REFRESH_EXPIRES_IN
        );
        return {
          status: HttpStatus.CREATED,
          data: {
            user: existingUser,
            access_token,
            refresh_token,
          },
        };
      }

      const newUser = new this.googleUserRepo({
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
        googleId: user.googleId,
        profilePicture: user.profilePicture ? user.profilePicture : undefined,
      });
      newUser.save(async (err, user) => {
        if (err) {
          console.log(err);
          throw new HttpException(
            'Something went wrong',
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
        const access_token = await this.authService.generateToken(
          user._id,
          environment.JWT_ACCESS_EXPIRES_IN
        );
        const refresh_token = await this.authService.generateToken(
          user._id,
          environment.JWT_REFRESH_EXPIRES_IN
        );
        return {
          status: HttpStatus.OK,
          data: {
            user,
            access_token,
            refresh_token,
          },
        };
      });
    }
  }
}
