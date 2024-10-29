import {Component} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {ModalActionEnum, ModalEvent, ModalTypeEnum} from '../models/modal.models';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-ticket',
  standalone: true,
  imports: [],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent {
  private MODAL_TYPE = ModalTypeEnum.ADD_TICKET_MODAL;
  private modalEvents: Observable<ModalEvent>;

  constructor(private _modalService: ModalService) {
    this.modalEvents = _modalService.getModalEvents(this.MODAL_TYPE);
    this.processModalEvents();
  }

  private onModalCancel(): void {
    this._modalService.closeModal(this.MODAL_TYPE);
  }

  private onModalConfirm(): void {
    this._modalService.cancelModal(this.MODAL_TYPE);
  }

  private processModalEvents(): void {
   this.modalEvents.subscribe((modalEvent: ModalEvent) => {
      switch (modalEvent.modalAction) {

        case ModalActionEnum.CANCEL:
          this.onModalCancel();
          break;

        case ModalActionEnum.CONFIRM:
          this.onModalConfirm();
          break;
      }
    });
  }
}
