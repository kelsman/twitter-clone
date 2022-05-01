import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Collections, UserFollowing } from '@project/core';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserEntity } from './user-schema';

@Schema()
export class FollowingEntity implements UserFollowing {
  @Transform((value) => value.toString())
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
  @IsString()
  @ApiProperty({
    type: String,
    description: 'User id',
    required: true,
    example: '5e9f8f8f8f8f8f8f8f8f8f8',
  })
  followingUsers: UserEntity | string[];
}

export type FollowingDocument = Document & FollowingEntity;
export const followingSchema = SchemaFactory.createForClass(FollowingEntity);
