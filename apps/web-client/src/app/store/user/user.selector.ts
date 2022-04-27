import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, USER_FEATURE_KEY } from './user.model';

const selectUserFeature = createFeatureSelector(USER_FEATURE_KEY);

const currentUser = createSelector(
  selectUserFeature,
  (state: UserState) => state.user
);

export const userSelectors = {
  currentUser,
};
