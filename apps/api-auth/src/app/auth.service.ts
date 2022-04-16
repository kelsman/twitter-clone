import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  Logger, NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { EmailConstants } from '@twitter-clone/core';
import { CreateUserDto } from '@twitter-clone/Dto';
import { UserDocument, UserEntity } from '@twitter-clone/Schemas';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  private _logger = new Logger('AppService');
  constructor(
    @InjectModel(UserEntity.name) private userRepo: Model<UserDocument>,
    @Inject('EMAIL_SERVICE') private readonly emailService: ClientProxy
  ) {}
  getData(): { message: string } {
    return { message: 'Welcome to api-auth!' };
  }

  async registerUser(body: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({
      email: body.email,
    });
    this._logger.log(existingUser);
    if (existingUser !== null || undefined)
      throw new ConflictException('User already exists');

    const user = new this.userRepo(body);
    await user.save();

    this.emailService.send(
       EmailConstants.EMAIL_VERIFICATION,
      {
        email: user.email,
        userId: user._id,
      }

    )
    return {
      status: HttpStatus.OK,
      message: 'Account created, check your email for verification',
    };

  }

  getAllUsers() {
    return this.userRepo.find();
  }
  comparePasswords(candidatePassword: string, hashedPassword: string) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  async emailExist(body: string) {
    const doesExist = await this.userRepo.findOne({ email: body });
    if (doesExist) {
      throw new ConflictException('Email already exists');
    }

    return {
      status: HttpStatus.OK,
    };
  }


  async verifyEmail(token: string ){

    const user = await this.userRepo.findById(token);
    if(!user) throw new NotFoundException('User not found');
    user.emailVerified = true;
    await user.save();
    return {
      status: HttpStatus.OK,
      message: 'Email verified'
    }

  }
}
