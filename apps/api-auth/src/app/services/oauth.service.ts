import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse, LogInUserResponse, OAuthProviders } from '@project/core';
import { UserDocument, UserEntity } from '@project/schemas';
import { Model } from 'mongoose';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class OAuthService {
  constructor(
    @InjectModel(UserEntity.name)
    private userRepo: Model<UserDocument>,
    private authService: AuthService
  ) {}

  async googleAuthRedirect(req): Promise<ApiResponse<LogInUserResponse>> {
    const user = req.user;
    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    //check is account is saved to database or not
    const userInDb = await this.userRepo.findOne({
      email: user.email,
    });
    console.log(userInDb);
    if (userInDb) {
      const access_token = await this.authService.generateToken(
        userInDb._id,
        environment.JWT_ACCESS_EXPIRES_IN
      );
      const refresh_token = await this.authService.generateToken(
        userInDb._id,
        environment.JWT_REFRESH_EXPIRES_IN
      );
      return {
        status: HttpStatus.CREATED,
        data: {
          user: userInDb,
          access_token,
          refresh_token,
        },
      };
    }
    const newUser = new this.userRepo({
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      provider: OAuthProviders.GOOGLE,
      profilePicture: user.profilePicture ? user.profilePicture : undefined,
    });
    newUser.save(async (err, savedUser) => {
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
          user: savedUser,
          access_token,
          refresh_token,
        },
      };
    });
  }
}
