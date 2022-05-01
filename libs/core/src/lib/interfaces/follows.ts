import { AuthUser } from './user';

export interface UserFollowers {
  _id?: string;
  owner: string | AuthUser;
  followerUsers: AuthUser | string[];
}

export interface UserFollowing {
  _id?: string;
  owner: string | AuthUser;
  followingUsers: AuthUser | string[];
}
