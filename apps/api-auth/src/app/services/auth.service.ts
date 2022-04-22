import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OnModuleDestroy } from '@nestjs/common/interfaces/hooks/on-destroy.interface';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  ApiResponse,
  RedisSubject,
  RefreshTokenResponse,
} from '@twitter-clone/core';
import { CreateUserDto, LogInUserDto } from '@twitter-clone/Dto';
import { UserDocument, UserEntity } from '@twitter-clone/Schemas';
import * as bcrypt from 'bcryptjs';
import { LogInUserResponse } from 'libs/interface/src';
import { Model } from 'mongoose';
import { catchError, from, map, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

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
    const access_token = await this.generateToken(
      user._id,
      environment.JWT_ACCESS_EXPIRES_IN
    );
    const refresh_token = await this.generateToken(
      user._id,
      environment.JWT_REFRESH_EXPIRES_IN
    );

    if (!access_token || !refresh_token) {
      throw new InternalServerErrorException('Error generating tokens');
    }
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

  async refreshToken(
    token: string
  ): Promise<ApiResponse<RefreshTokenResponse>> {
    let userId: string;
    from(
      this.jwtService.verifyAsync(token, {
        secret: environment.JWT_SECRET,
      })
    ).pipe(
      map((decoded: any) => {
        userId = decoded.userId;
      }),
      catchError((err) => {
        //check if error is expired token
        if (err.name === 'TokenExpiredError') {
          throw new UnauthorizedException('Token expired');
        }
        this._logger.error('Error verifying token: ', err);
        throw new BadRequestException('Invalid token');
      })
    );
    const access_token = await this.generateToken(
      userId,
      environment.JWT_ACCESS_EXPIRES_IN
    );
    const refresh_token = await this.generateToken(
      userId,
      environment.JWT_REFRESH_EXPIRES_IN
    );

    return {
      status: HttpStatus.OK,
      message: 'success',
      data: {
        access_token,
        refresh_token,
        access_token_expires_in: environment.JWT_ACCESS_EXPIRES_IN,
        refresh_token_expires_in: environment.JWT_REFRESH_EXPIRES_IN,
      },
    };
  }

  async generateToken(userId: string, ttl: string) {
    return await this.jwtService.signAsync(
      {
        userId: userId,
      },
      {
        expiresIn: ttl,
      }
    );
  }
}
