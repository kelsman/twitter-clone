import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { PostState } from './post.model';

const selectPostFeature = (state: AppState) => state.post;

const selectLoadingFeed = createSelector(
  selectPostFeature,
  (state: PostState) => state.loadingFeed
);

const selectFeeds = createSelector(
  selectPostFeature,
  (state: PostState) => state.feed
);

const selectPost = createSelector(
  selectPostFeature,
  (state: PostState) => state.post
);

const selectLoading = createSelector(
  selectPostFeature,
  (state: PostState) => state.loading
);

export const PostSelectors = {
  selectLoadingFeed,
  selectFeeds,
  selectPost,
  selectLoading,
};
