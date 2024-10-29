import { Component } from '@angular/core';
import {ModalActionEnum, ModalEvent, ModalTypeEnum} from '../models/modal.models';
import {Observable} from 'rxjs';
import {ModalService} from '../services/modal.service';
import {AddTicketRequest, Ticket, UpdateTicketRequest} from '../models/ticket.models';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {TicketService} from '../services/ticket.service';
import {ListTicketsService} from '../services/list-tickets.service';

@Component({
  selector: 'app-edit-ticket',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-ticket.component.html',
  styleUrl: './edit-ticket.component.css'
})
export class EditTicketComponent {
  private MODAL_TYPE = ModalTypeEnum.EDIT_TICKET_MODAL;
  private modalEvents: Observable<ModalEvent>;
  protected ticket?: Ticket;
  protected errorMsg: string | null = null;

  editTicketForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  get title() {
    return this.editTicketForm.get('title');
  }

  get description() {
    return this.editTicketForm.get('description');
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
    this.editTicketForm.reset()
    this._modalService.closeModal(this.MODAL_TYPE);
  }

  private async onModalConfirm(): Promise<void> {
     if (this.editTicketForm.invalid) {
      return;
    }

    this._modalService.showModalLoader();
    try {
      const ticketRequest: UpdateTicketRequest = {
        title: this.title?.value!!,
        description: this.description?.value!!,
      };
      await this._ticketService.updateTicket(this.ticket?.id!!, ticketRequest);
      this._modalService.closeModal(this.MODAL_TYPE);
      this.editTicketForm.reset()
      await this._listTicketService.loadTickets();
    } catch (error) {
      this._modalService.hideModalLoader();
      this.errorMsg = 'Could not update the ticket';
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

        case ModalActionEnum.OPEN:
          this.ticket = modalEvent.ticket;
          this.errorMsg = null;
          this.title?.setValue(this.ticket?.title);
          this.description?.setValue(this.ticket?.description);
          break;
      }
    });
  }
}
