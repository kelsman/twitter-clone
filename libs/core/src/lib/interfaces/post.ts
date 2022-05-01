import { AuthUser } from './user';

export interface Post {
  _id: string;
  content: string;
  author: AuthUser | string;
  pinned?: boolean;
  createdAt: Date;
  updatedAt: Date;
  postMedia?: {
    url: string;
    key: string;
  }[];
}

export interface CreatePost {
  content: string;
}
