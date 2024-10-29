import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private addTicketModal: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  /**
   * Ensures that all the modals are closed.
   * We call this before attempting to open a new modal.
   *
   * @private
   */
  private closeOtherModals(): void {
    // todo: close other modals.
  }


  /**
   * Open the add ticket modal.
   *
   */
  public openAddTicketModal(): void {
    this.closeOtherModals();
    this.addTicketModal.next(true);
  }

  public getAddTicketModal(): Observable<boolean> {
    return this.addTicketModal.asObservable();
  }
}
