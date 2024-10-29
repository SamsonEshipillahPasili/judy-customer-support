import {Ticket} from './ticket.models';

/**
 * The list of modals we have in the app.
 */
export enum ModalTypeEnum {
  NONE,
  ADD_TICKET_MODAL,
  DELETE_TICKET_MODAL,
  EDIT_TICKET_MODAL,
  RESOLVE_TICKET_MODAL,
}

export enum ModalActionEnum {
  NONE,
  OPEN,
  CLOSE,
  CANCEL,
  CONFIRM,
  LOADING,
  NOT_LOADING
}

export interface ModalEvent {
  modalType: ModalTypeEnum
  modalAction: ModalActionEnum
  ticket?: Ticket
}
