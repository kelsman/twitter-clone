import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUser } from '@twitter-clone/api-interfaces';
import { Collections } from '@twitter-clone/core';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: Collections.USERS })
export class UserEntity implements CreateUser {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: false })
  bio?: string;

  @Prop({ type: Boolean, default: false })
  emailVerified?: boolean;

  @Prop({required: false, default: false})
  verified?: boolean;

  @Prop({
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ type: String, required: false })
  profilePicture: string;
}

export type UserDocument = Document & UserEntity;

export const UserSchema = SchemaFactory.createForClass(UserEntity);
