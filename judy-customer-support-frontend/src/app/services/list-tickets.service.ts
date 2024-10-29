import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ListTicketsState} from '../models/list_tickets.models';
import {TicketService} from './ticket.service';

@Injectable({
  providedIn: 'root'
})
export class ListTicketsService {
  private _listTicketsState: BehaviorSubject<ListTicketsState>;

  constructor(private ticketService: TicketService) {
    const initialState : ListTicketsState = {
      isLoading: false,
      tickets: [],
      errorMsg: null
    };
    this._listTicketsState = new BehaviorSubject(initialState)
  }

  get listTicketsState(): Observable<ListTicketsState> {
    return this._listTicketsState.asObservable();
  }

  public async loadTickets(): Promise<void> {
    this._listTicketsState.next({
      isLoading: true,
      tickets: null,
      errorMsg: null
    });

    try {
      const tickets = await this.ticketService.listTickets();
      this._listTicketsState.next({
        isLoading: false,
        tickets: tickets,
        errorMsg: null
      });
    } catch (e) {
      console.error(e);
      this._listTicketsState.next({
        isLoading: false,
        tickets: null,
        errorMsg: 'There was an error loading the tickets'
      });
    }

  }
}
