import { AuthUser } from '@twitter-clone/interface';


export type UserState = {
  user: AuthUser | null;
  error: string | null;
  loadingUser: boolean;
};
