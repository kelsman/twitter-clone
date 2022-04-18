import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse, RedisSubject } from '@twitter-clone/core';
import { CreateUserDto, LogInUserDto } from '@twitter-clone/Dto';
import { UserDocument, UserEntity } from '@twitter-clone/Schemas';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { OnModuleDestroy } from '@nestjs/common/interfaces/hooks/on-destroy.interface';
import { Subject } from 'rxjs';
import { LogInUserResponse } from '@twitter-clone/api-interfaces';
import { JwtService } from '@nestjs/jwt';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService implements OnModuleDestroy {
  private destroy$ = new Subject<void>();
  private _logger = new Logger('AppService');

  constructor(
    @InjectModel(UserEntity.name) private userRepo: Model<UserDocument>,
    @Inject('EMAIL_SERVICE') private readonly emailService: ClientProxy,
    private jwtService: JwtService
  ) {}

  onModuleDestroy() {
    this.destroy$.next();
  }

  getData(): { message: string } {
    return { message: 'Welcome to api-auth!' };
  }

  async registerUser(body: CreateUserDto): Promise<ApiResponse<void>> {
    const existingUser = await this.userRepo.findOne({
      email: body.email,
    });
    if (existingUser !== null || undefined)
      throw new ConflictException('User already exists');

    const user = new this.userRepo(body);
    await user.save();

    this.emailService.emit(RedisSubject.CONFIRM_EMAIL_SUBJECT, {
      email: user.email,
      userId: user._id,
    });
    return {
      status: HttpStatus.CREATED,
      message:
        'User created successfully, check your email to confirm your account',
    };
  }

  async loginUser(body: LogInUserDto): Promise<ApiResponse<LogInUserResponse>> {
    const user: UserDocument = await this.userRepo
      .findOne({
        $or: [{ email: body.email }, { username: body.username }],
      })
      .lean();

    if (!user) throw new NotFoundException('Invalid Credentials');

    if (!bcrypt.compareSync(body.password, user.password))
      throw new NotFoundException('Invalid Credentials');
    const access_token = await this.jwtService.signAsync(
      {
        email: user.email,
        userId: user._id,
      },
      {
        expiresIn: environment.JWT_ACCESS_EXPIRES_IN,
      }
    );

    const refresh_token = await this.jwtService.signAsync(
      {
        email: user.email,
        userId: user._id,
      },
      {
        expiresIn: environment.JWT_REFRESH_EXPIRES_IN,
      }
    );

    if (!access_token || !refresh_token)
      throw new InternalServerErrorException('Error generating tokens');

    user['password'] = undefined;

    return {
      status: HttpStatus.OK,
      message: 'success',
      data: {
        user,
        access_token,
        refresh_token,
      },
    };
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

  async verifyEmail(token: string): Promise<ApiResponse<boolean>> {
    const user = await this.userRepo.findById(token);
    if (!user) throw new NotFoundException('User not found');
    user.emailVerified = true;
    await user.save();
    return {
      status: HttpStatus.OK,
      message: 'Email verified',
      data: true,
    };
  }
}
