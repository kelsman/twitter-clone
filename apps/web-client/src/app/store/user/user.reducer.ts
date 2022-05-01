import { createReducer, on } from '@ngrx/store';
import { userActions } from './user.actions';
import { UserState } from './user.model';

const initialState: UserState = {
  user: null,
  error: null,
  loadingAction: false,
};

export const userReducer = createReducer(
  initialState,
  on(userActions.googleLogin, (state) => ({
    ...state,
    loadingAction: true,
  })),
  on(userActions.googleLoginFailure, (state, { error }) => ({
    ...state,
    error,
    loadingAction: false,
  })),
  on(userActions.setUser, (state, { user }) => ({
    ...state,
    user: user,
    loadingAction: false,
  })),
  on(userActions.logOutUser, (state) => ({
    ...state,
    user: null,
    loadingAction: false,
    error: null,
  }))
);
