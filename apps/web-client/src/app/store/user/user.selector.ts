import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { UserState } from './user.model';

const selectUserFeature = (state: AppState) => state.user;

const currentUser = createSelector(
  selectUserFeature,
  (state: UserState) => state.user
);

const loadingAction = createSelector(
  selectUserFeature,
  (state: UserState) => state.loadingAction
);

const userError = createSelector(
  selectUserFeature,
  (state: UserState) => state.error
);

export const userSelectors = {
  currentUser,
  loadingAction,
  userError,
};
