import { Component } from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {AddTicketComponent} from '../add-ticket/add-ticket.component';
import {ModalService} from '../services/modal.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

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
  protected addTicketModalState: Observable<boolean>;

  constructor(private _modalService: ModalService) {
    this.addTicketModalState = this._modalService.getAddTicketModal();
  }

  public onCreateNewTicket(): void {
    this._modalService.openAddTicketModal();
  }
}
