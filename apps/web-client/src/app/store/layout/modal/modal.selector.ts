import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ModalState, MODAL_FEATURE_KEY } from './modal.model';

const selectModalFeature = createFeatureSelector<ModalState>(MODAL_FEATURE_KEY);

const isModalOpen = (modalId: string) =>
  createSelector(selectModalFeature, (state: ModalState) => {
    const modal = state.modals.find((v) => v.modalId === modalId);
    return modal ? modal.isOpen : false;
  });

const isModalReady = (modalId: string) =>
  createSelector(selectModalFeature, (state: ModalState) =>
    state.modals.some((v) => v.modalId === modalId)
  );

export const modalSelectors = {
  isModalOpen,
  isModalReady,
};
