import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Collections, Comment, Post } from '@project/core';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserEntity } from './user-schema';

@Schema({ collection: Collections.COMMENTS, timestamps: true })
export class CommentModel implements Comment {
  @Transform(({ value }) => value.toString())
  @ApiProperty({ type: String, example: new ObjectId() })
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Collections.USERS,
    required: true,
  })
  author: UserEntity | string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Collections.POSTS,
  })
  @ApiProperty({ type: String, example: new ObjectId() })
  post: string | Post;

  @Prop({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'Hello World', required: true })
  content: string;

  @Prop({
    required: false,
    type: [
      {
        url: String,
        key: String,
      },
    ],
  })
  @IsOptional()
  @ApiProperty({ type: [String], example: ['https://example.com/image.png'] })
  media?: {
    url: string;
    key: string;
  }[];

  @ApiProperty({ type: Date, example: new Date() })
  createdAt: Date;

  @ApiProperty({ type: Date, example: new Date() })
  updatedAt: Date;

  @ApiProperty({ type: Number, example: 0 })
  __v: number;
}

export type CommentDocument = Document & CommentModel;

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
