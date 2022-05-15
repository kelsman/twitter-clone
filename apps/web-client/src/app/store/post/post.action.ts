import { createAction, props } from '@ngrx/store';
import { Post } from '@project/core';

const postActionTypes = {
  CREATE_POST: '[POST] CREATE_POST',
  CREATE_POST_SUCCESS: '[POST] CREATE_POST_SUCCESS',
  CREATE_POST_FAIL: '[POST] CREATE_POST_FAIL',

  GET_FEED: '[POST] GET_FEED',
  GET_FEED_SUCCESS: '[POST] GET_FEED_SUCCESS',
  GET_FEED_FAIL: '[POST] GET_FEED_FAIL',
  ADD_FEED: '[POST] ADD_FEED',
  LIKE_POST: '[POST] LIKE_POST',
  Like_POST_SUCCESS: '[POST] LIKE_POST_SUCCESS',
  LIKE_POST_FAIL: '[POST] LIKE_POST_FAIL',
  UNLIKE_POST: '[POST] UNLIKE_POST',
  UNLIKE_POST_SUCCESS: '[POST] UNLIKE_POST_SUCCESS',
  UNLIKE_POST_FAIL: '[POST] UNLIKE_POST_FAIL',
};

const createPost = createAction(
  postActionTypes.CREATE_POST,
  props<{ data: FormData }>()
);

const createPostSuccess = createAction(
  postActionTypes.CREATE_POST_SUCCESS,
  props<{ post: Post }>()
);

const createPostFail = createAction(
  postActionTypes.CREATE_POST_FAIL,
  props<{ error: string }>()
);

const getFeed = createAction(postActionTypes.GET_FEED);

const getFeedSuccess = createAction(
  postActionTypes.GET_FEED_SUCCESS,
  props<{ posts: Post[] }>()
);

const getFeedFail = createAction(
  postActionTypes.GET_FEED_FAIL,
  props<{ error: string }>()
);

const addToFeed = createAction(
  postActionTypes.ADD_FEED,
  props<{ post: Post }>()
);

const likePost = createAction(
  postActionTypes.LIKE_POST,
  props<{ postId: string }>()
);
const likePostSuccess = createAction(
  postActionTypes.Like_POST_SUCCESS,
  props<{ post: Post }>()
);

const unlikePost = createAction(
  postActionTypes.UNLIKE_POST,
  props<{ postId: string }>()
);
const unlikePostSuccess = createAction(
  postActionTypes.UNLIKE_POST_SUCCESS,
  props<{ post: Post }>()
);

export const PostActions = {
  createPost,
  createPostSuccess,
  createPostFail,
  getFeed,
  getFeedSuccess,
  getFeedFail,
  addToFeed,
  likePost,
  likePostSuccess,
  unlikePost,
  unlikePostSuccess,
};
