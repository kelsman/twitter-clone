import { UserDocument } from '@twitter-clone/Schemas';

export interface CreateUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  username: string;
  bio?: string;
  profilePicture?: string;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  username: string;
  bio?: string;
  profilePicture?: string;
}

export interface LogInUserResponse {
  user: UserDocument;
  access_token: string;
  refresh_token: string;
}
