import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, map, Observable} from 'rxjs';
import {ModalActionEnum, ModalEvent, ModalTypeEnum} from '../models/modal.models';
import {Ticket} from '../models/ticket.models';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalEvents: BehaviorSubject<ModalEvent>;

  constructor() {
    let defaultEvent: ModalEvent = {
      modalType: ModalTypeEnum.NONE,
      modalAction: ModalActionEnum.NONE
    }
    this.modalEvents = new BehaviorSubject(defaultEvent);
  }

  /**
   * Ensures that all the modals are closed.
   * We call this before attempting to open a new modal.
   *
   */
  public closeAllModals(): void {

  }

  public getModalEvents(modalType: ModalTypeEnum): Observable<ModalEvent> {
    return this.modalEvents.asObservable()
      .pipe(
        filter(it => it.modalType == modalType)
      );
  }

  public openModal(modalType: ModalTypeEnum, ticket?: Ticket): void {
    this.closeAllModals();
    this.modalEvents.next({
      modalType: modalType,
      modalAction: ModalActionEnum.OPEN,
      ticket: ticket
    });
  }

  public closeModal(modalType: ModalTypeEnum): void {
    this.closeAllModals();
    this.modalEvents.next({
      modalType: modalType,
      modalAction: ModalActionEnum.CLOSE
    });
  }

  public cancelModal(modalType: ModalTypeEnum): void {
    this.closeAllModals();
    this.modalEvents.next({
      modalType: modalType,
      modalAction: ModalActionEnum.CANCEL
    });
  }

  public showModalLoader(): void {
    this.modalEvents.next({
      modalType: ModalTypeEnum.NONE,
      modalAction: ModalActionEnum.LOADING
    });
  }

  public hideModalLoader(): void {
    this.modalEvents.next({
      modalType: ModalTypeEnum.NONE,
      modalAction: ModalActionEnum.NOT_LOADING
    });
  }

  public isModalLoading(): Observable<boolean> {
    return this.modalEvents.asObservable().pipe(
      filter(it => it.modalType == ModalTypeEnum.NONE),
      filter(it => it.modalAction == ModalActionEnum.LOADING
        || it.modalAction == ModalActionEnum.NOT_LOADING),
      map(it => it.modalAction == ModalActionEnum.LOADING),
    );
  }


  public confirmModal(modalType: ModalTypeEnum): void {
    this.closeAllModals();
    this.modalEvents.next({
      modalType: modalType,
      modalAction: ModalActionEnum.CONFIRM
    });
  }

  public isModalOpen(modalType: ModalTypeEnum): Observable<boolean> {
    return this.modalEvents.asObservable().pipe(
      filter(value => value.modalType == modalType),
      filter(value => value.modalAction == ModalActionEnum.CLOSE || value.modalAction == ModalActionEnum.OPEN),
      map(value => value.modalAction == ModalActionEnum.OPEN),
    );
  }

}
