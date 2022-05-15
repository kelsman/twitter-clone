import { Post } from '@project/core';

export interface PostState {
  post: Post | null;
  error: string | null;
  loadingPost: boolean;
  loadingFeed: boolean;
  feed: Post[];
  loading: boolean;
}

export const POST_FEATURE_KEY = 'post';
