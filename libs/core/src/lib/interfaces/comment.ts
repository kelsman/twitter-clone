import { Post } from './post';
import { AuthUser } from './user';

export interface Comment {
  _id: string;

  content: string;

  media?: {
    url: string;
    key: string;
  }[];

  author: AuthUser | string;

  post: Post | string;
}

export interface CommentReplies {
  _id: string;
  comment: Comment | string;
  content: string;
  media: [
    {
      url: string;
      key: string;
    }
  ];
}
