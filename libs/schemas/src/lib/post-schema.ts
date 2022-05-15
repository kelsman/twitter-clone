import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Collections, Post } from '@project/core';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserEntity } from './user-schema';

@Schema({ timestamps: true, collection: Collections.POSTS })
export class PostEntity implements Post {
  @Transform(({ value }) => value.toString())
  @ApiProperty({ type: String, example: new ObjectId() })
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Collections.USERS,
    required: true,
    populate: true,
  })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '625f0fcc774486c338285eb7' })
  author: UserEntity | string;

  @Prop({ type: String, trim: true })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Hello World', required: true })
  content: string;

  @Prop({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, type: Boolean })
  pinned?: boolean;

  @Prop({
    required: false,
    type: [
      {
        url: String,
        key: String,
      },
    ],
  })
  postMedia?: {
    url: string;
    key: string;
  }[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: Collections.USERS,
    required: false,
    default: [],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserEntity)
  likes?: UserEntity[] | string[];

  @Prop({ required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, type: Number, example: 0 })
  likesCount?: number;

  @Prop({ required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, type: Number, example: 0 })
  commentsCount?: number;

  @Prop({ required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, type: Number, example: 0 })
  retweetsCount?: number;

  @Prop({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, type: Boolean })
  userLikedPost?: boolean;

  @ApiProperty({ type: Date, example: new Date() })
  createdAt: Date;

  @ApiProperty({ type: Date, example: new Date() })
  updatedAt: Date;

  @ApiProperty({ type: Number, example: 0 })
  __v: number;
}

export type PostDocument = Document & PostEntity;
export const PostSchema = SchemaFactory.createForClass(PostEntity);
PostSchema.plugin(require('mongoose-autopopulate'));
