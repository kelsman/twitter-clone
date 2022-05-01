import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Collections, Post } from '@project/core';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
    ref: Collections.POSTS,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '625f0fcc774486c338285eb7' })
  author: UserEntity | string;

  @Prop({ type: String, trim: true })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Hello World' })
  content: string;

  @Prop({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, default: false })
  pinned?: boolean;

  @ApiProperty({ type: Date, example: new Date() })
  createdAt: Date;

  @ApiProperty({ type: Date, example: new Date() })
  updatedAt: Date;

  @ApiProperty({ type: Number, example: 0 })
  __v: number;
}

export type PostDocument = Document & PostEntity;
export const PostSchema = SchemaFactory.createForClass(PostEntity);
