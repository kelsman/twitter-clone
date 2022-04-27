import { createAction, props } from '@ngrx/store';

export const ModalActionTypes = {
  OPEN_MODAL: '[Layout] Open Modal',
  CLOSE_MODAL: '[Layout] Close Modal',
  REGISTER_MODAL: '[Layout] Register Modal',
};

export const openModal = createAction(
  ModalActionTypes.OPEN_MODAL,
  props<{ modalId: string }>()
);

export const closeModal = createAction(
  ModalActionTypes.CLOSE_MODAL,
  props<{ modalId: string }>()
);

export const registerModal = createAction(
  ModalActionTypes.REGISTER_MODAL,
  props<{ modalId: string }>()
);

export const ModalActions = {
  openModal,
  closeModal,
  registerModal,
};
