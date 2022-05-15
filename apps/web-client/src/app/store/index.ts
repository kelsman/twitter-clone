import { modalReducer, ModalState } from './layout';
import { postReducer } from './post';
import { PostEffects } from './post/post.effect';
import { PostState } from './post/post.model';
import { userReducer, UserState } from './user';
import { userEffectService } from './user/user.effects';

export const appReducers = {
  modals: modalReducer,
  user: userReducer,
  post: postReducer,
};

export const appEffects = [userEffectService, PostEffects];

export interface AppState {
  modals: ModalState;
  user: UserState;
  post: PostState;
}
