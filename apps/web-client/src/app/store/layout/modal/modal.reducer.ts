import { createReducer, on } from '@ngrx/store';
import { ModalActions } from './modal.action';
import { ModalState } from './modal.model';

const initialState: ModalState = {
  modals: [
    {
      modalId: 'google-auth',
      isOpen: true,
    },
  ],
};

export const modalReducer = createReducer(
  initialState,
  on(ModalActions.openModal, (state, { modalId }) => ({
    ...state,
    modals: [...state.modals, { modalId, isOpen: true }],
  })),
  on(ModalActions.closeModal, (state, { modalId }) => ({
    ...state,
    modals: state.modals.filter((modal) => modal.modalId !== modalId),
  }))
);
