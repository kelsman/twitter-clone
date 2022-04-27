interface IModal {
  modalId: string;
  isOpen: boolean;
}

export interface ModalState {
  modals: IModal[];
}

export const MODAL_FEATURE_KEY = 'modals';
