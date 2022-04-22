import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateGoogleUser } from '@project/core';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class GoogleUserEntity implements CreateGoogleUser {
  @Prop({ required: true })
  googleId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  emailVerified: boolean;

  @Prop({ required: false })
  profilePicture?: string;

  @Prop({ required: true })
  name: string;
}

export type GoogleUserDocument = GoogleUserEntity & Document;
export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUserEntity);
