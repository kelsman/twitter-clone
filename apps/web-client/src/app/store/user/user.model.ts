import { AuthUser } from '@project/core';

export interface UserState {
  user: AuthUser | null;
  error: string;
  loadingAction: boolean;
}

export const USER_FEATURE_KEY = 'user';
