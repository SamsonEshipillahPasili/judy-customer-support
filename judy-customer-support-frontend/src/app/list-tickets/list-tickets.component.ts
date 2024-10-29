import { Component } from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {AddTicketComponent} from '../add-ticket/add-ticket.component';

@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [
    ModalComponent,
    AddTicketComponent
  ],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css'
})
export class ListTicketsComponent {

}
