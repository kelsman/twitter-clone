import { createAction, props } from '@ngrx/store';
import { AuthUser } from '@project/core';
import { SocialUser } from 'angularx-social-login';

const userActionTypes = {
  GOOGLE_LOGIN: '[User] Google Login ',
  GOOGLE_LOGIN_FAILURE: '[User] Google Login Failure',
  SET_USER: '[User] Set User',
  CLEAR_USER: '[User] Clear User',
  LOGOUT_USER: '[User] Logout User',
  LOGIN_START: '[User] Login Start',
  LOGIN_SUCCESS: '[User] Login Success',
  LOGIN_FAILURE: '[User] Login Failure',
};

export const googleLogin = createAction(
  userActionTypes.GOOGLE_LOGIN,
  props<{ user: SocialUser }>()
);

const googleLoginFailure = createAction(
  userActionTypes.GOOGLE_LOGIN_FAILURE,
  props<{ error: string }>()
);
const setUser = createAction(
  userActionTypes.SET_USER,
  props<{ user: AuthUser }>()
);
export const userActions = {
  googleLogin,
  googleLoginFailure,
  setUser,
};
