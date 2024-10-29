import {Component} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {ModalActionEnum, ModalEvent, ModalTypeEnum} from '../models/modal.models';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {TicketService} from '../services/ticket.service';
import {AddTicketRequest} from '../models/ticket.models';
import {ListTicketsService} from '../services/list-tickets.service';

@Component({
  selector: 'app-add-ticket',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent {
  private MODAL_TYPE = ModalTypeEnum.ADD_TICKET_MODAL;
  private modalEvents: Observable<ModalEvent>;
  protected errorMsg: string | null = null;

  addTicketForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  get title() {
    return this.addTicketForm.get('title');
  }

  get description() {
    return this.addTicketForm.get('description');
  }


  constructor(
    private _modalService: ModalService,
    private _ticketService: TicketService,
    private _listTicketService: ListTicketsService
  ) {
    this.modalEvents = _modalService.getModalEvents(this.MODAL_TYPE);
    this.processModalEvents();
  }

  private onModalCancel(): void {
    this.addTicketForm.reset();
    this._modalService.closeModal(this.MODAL_TYPE);
  }

  private async onModalConfirm(): Promise<void> {
    if (this.addTicketForm.invalid) {
      return;
    }

    this._modalService.showModalLoader();
    try {
      const ticketRequest: AddTicketRequest = {
        title: this.title?.value!!,
        description: this.description?.value!!,
      };
      await this._ticketService.addTicket(ticketRequest);
      this._modalService.closeModal(this.MODAL_TYPE);
      this.addTicketForm.reset()
      await this._listTicketService.loadTickets();
    } catch (error) {
      this._modalService.hideModalLoader();
      this.errorMsg = 'Could not add the ticket';
    }
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
