import {Component} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {AddTicketComponent} from '../add-ticket/add-ticket.component';
import {ModalService} from '../services/modal.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ModalTypeEnum} from '../models/modal.models';

@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [
    ModalComponent,
    AddTicketComponent,
    AsyncPipe
  ],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css'
})
export class ListTicketsComponent {
  protected isAddTicketModalOpen: Observable<boolean>;

  constructor(private _modalService: ModalService) {
    this.isAddTicketModalOpen = this._modalService.isModalOpen(ModalTypeEnum.ADD_TICKET_MODAL);
  }

  public onCreateNewTicket(): void {
    this._modalService.openModal(ModalTypeEnum.ADD_TICKET_MODAL);
  }

  public onAddTicketCancel(): void {
    this._modalService.cancelModal(ModalTypeEnum.ADD_TICKET_MODAL);
  }

  public onAddTicketConfirm(): void {
    this._modalService.confirmModal(ModalTypeEnum.ADD_TICKET_MODAL);
  }

}
