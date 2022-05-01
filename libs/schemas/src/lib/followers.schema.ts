import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Collections, UserFollowers } from '@project/core';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { UserEntity } from './user-schema';

export class FollowersEntity implements UserFollowers {
  @Transform((value) => value.toString())
  @ApiProperty({ type: String, example: new ObjectId() })
  _id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Collections.USERS,
  })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User id',
    example: '5e9f8f8f8f8f8f8f8f8f8f8',
    required: true,
  })
  owner: UserEntity | string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: Collections.USERS,
    required: true,
  })
  @IsNotEmpty()
  @ApiProperty({
    type: [String],
    description: 'list of users following the owner',
    required: true,
    example: ['5e9f8f8f8f8f8f8f8f8f8f8'],
  })
  followerUsers: UserEntity | string[];
}
