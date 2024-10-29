import { Component } from '@angular/core';
import {ModalActionEnum, ModalEvent, ModalTypeEnum} from '../models/modal.models';
import {Observable} from 'rxjs';
import {ModalService} from '../services/modal.service';
import {ResolveTicketRequest, Ticket} from '../models/ticket.models';
import {TicketService} from '../services/ticket.service';
import {ListTicketsService} from '../services/list-tickets.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-resolve-ticket',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './resolve-ticket.component.html',
  styleUrl: './resolve-ticket.component.css'
})
export class ResolveTicketComponent {
  private MODAL_TYPE = ModalTypeEnum.RESOLVE_TICKET_MODAL;
  private modalEvents: Observable<ModalEvent>;
  protected ticket?: Ticket;
  protected errorMsg: string | null = null;

  constructor(
    private _modalService: ModalService,
    private _ticketService: TicketService,
    private _listTicketService: ListTicketsService,
  ) {
    this.modalEvents = _modalService.getModalEvents(this.MODAL_TYPE);
    this.processModalEvents();
  }

  private onModalCancel(): void {
    this._modalService.closeModal(this.MODAL_TYPE);
  }

  private async onModalConfirm(): Promise<void> {
      this._modalService.showModalLoader();
    try {
      const resolveTicketRequest: ResolveTicketRequest = {
        is_resolved: true
      }
      await this._ticketService.resolveTicket(this.ticket!!.id, resolveTicketRequest);
      this._modalService.closeModal(this.MODAL_TYPE);
      await this._listTicketService.loadTickets();
    } catch (error) {
      this._modalService.hideModalLoader();
      this.errorMsg = 'Could not mark the ticket as resolved. Try Again.';
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
          break;
      }
    });
  }
}
