import { modalReducer, ModalState } from './layout';
import { userReducer, UserState } from './user';
import { userEffectService } from './user/user.effects';

export const appReducers = {
  modals: modalReducer,
  user: userReducer,
};

export const appEffects = [userEffectService];

export interface AppState {
  modals: ModalState;
  user: UserState;
}
