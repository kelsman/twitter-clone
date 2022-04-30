import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, USER_FEATURE_KEY } from './user.model';

const selectUserFeature = createFeatureSelector(USER_FEATURE_KEY);

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
