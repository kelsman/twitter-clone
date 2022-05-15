import { createReducer, on } from '@ngrx/store';
import { PostActions } from './post.action';
import { PostState } from './post.model';

const initialState: PostState = {
  post: null,
  error: null,
  loadingPost: false,
  loadingFeed: false,
  loading: false,
  feed: [],
};

export const postReducer = createReducer(
  initialState,
  on(PostActions.createPost, (state) => ({
    ...state,
    loading: true,
  })),

  on(PostActions.getFeed, (state) => ({
    ...state,
    loadingFeed: true,
  })),
  on(PostActions.getFeedSuccess, (state, { posts }) => ({
    ...state,
    feed: posts,
    loadingFeed: false,
  })),

  on(PostActions.getFeedFail, (state, { error }) => ({
    ...state,
    error,
    loadingFeed: false,
  })),

  on(PostActions.createPostFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PostActions.createPostSuccess, (state, { post }) => ({
    ...state,
    feed: [post, ...state.feed],
    loading: false,
  })),

  on(PostActions.likePostSuccess, (state, { post }) => {
    const index = state.feed.findIndex((p) => p._id === post._id);
    const updatedFeed = [...state.feed];
    updatedFeed[index] = post;
    return {
      ...state,
      feed: updatedFeed,
    };
  }),
  on(PostActions.unlikePostSuccess, (state, { post }) => {
    const index = state.feed.findIndex((p) => p._id === post._id);
    const updatedFeed = [...state.feed];
    updatedFeed[index] = post;
    return {
      ...state,
      feed: updatedFeed,
    };
  })
);
