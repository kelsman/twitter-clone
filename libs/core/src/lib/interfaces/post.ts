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
  likesCount?: number;
  commentsCount?: number;
  retweetsCount?: number;
  likes?: string[] | AuthUser[];
  userLikedPost?: boolean;
}

export interface CreatePost {
  content: string;
}
