import { GoogleUserDocument, UserDocument } from '@project/schemas';

export interface CreateUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  username: string;
  bio?: string;
  profilePicture?: string;
}

export interface CreateGoogleUser {
  _id?: string;
  googleId: string;
  email: string;
  emailVerified: boolean;
  name: string;
  profilePicture?: string;
}

export interface AuthUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  username: string;
  bio?: string;
  profilePicture?: string;
  provider?: string;
}

export interface LogInUserResponse {
  user: UserDocument;
  access_token: string;
  refresh_token: string;
}

export interface GoogleLoginResponse {
  user: GoogleUserDocument;
  access_token: string;
  refresh_token: string;
}
