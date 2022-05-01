import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponseType, AuthUser } from '@project/core';
import { UserDocument, UserEntity } from '@project/schemas';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable()
export class AppService {
  constructor(
    @InjectModel(UserEntity.name) private userRepo: Model<UserDocument>
  ) {}
  getData(): { message: string } {
    return { message: 'Welcome to api-user!' };
  }

  findById(id: string) {
    return this.userRepo.findById(id);
  }

  updateUsername(
    userId: string,
    username: string
  ): Observable<ApiResponseType<AuthUser>> {
    return from(
      this.userRepo.findByIdAndUpdate(
        userId,
        {
          $set: {
            username,
          },
        },
        {
          returnDocument: 'after',
        }
      )
    ).pipe(
      catchError((error) => {
        throw new InternalServerErrorException();
      }),
      map((user) => {
        return {
          status: HttpStatus.CREATED,
          message: 'Update Success',
          data: user,
        };
      })
    );
  }

  async getProfile(id: string): Promise<ApiResponseType<AuthUser>> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'User found',
      data: user,
    };
  }
}
