import { Component } from '@angular/core';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [
    ModalComponent
  ],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css'
})
export class ListTicketsComponent {

}
