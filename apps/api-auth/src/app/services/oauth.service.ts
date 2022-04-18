import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity } from '@twitter-clone/Schemas';
import { Model } from 'mongoose';
import { AuthService } from './auth.service';

@Injectable()
export class OAuthService {
  constructor(
    @InjectModel(UserEntity.name) private userRepo: Model<UserDocument>,
    private authService: AuthService
  ) {}

  async googleAuthRedirect(req) {
    if (!req.user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const user = req.user;

    //check is account is saved to database or not
    const existingUser = await this.userRepo.findOne({ email: user.email });
    if (existingUser) {
      return;
    }

    const newUser = new this.userRepo({
      email: user.email,
      name: user.name,

      emailVerified: user.emailVerified,
      profilePicture: user.profilePicture ? user.profilePicture : undefined,
    });
    await newUser.save((err, user) => {
      if (err) {
        console.log(err);
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      return;
    });
  }
}
