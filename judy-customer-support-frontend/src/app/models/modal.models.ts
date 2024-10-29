/**
 * The list of modals we have in the app.
 */
export enum ModalTypeEnum {
  NONE,
  ADD_TICKET_MODAL
}

export enum ModalActionEnum {
  NONE,
  OPEN,
  CLOSE,
  CANCEL,
  CONFIRM
}

export interface ModalEvent {
  modalType: ModalTypeEnum
  modalAction: ModalActionEnum
}
