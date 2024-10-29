import {Injectable} from '@angular/core';
import {LoginService} from './login.service';
import {AddTicketRequest, Ticket} from '../models/ticket.models';
import {TICKETS_ENDPOINT} from '../app.endpoints';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private _loginService: LoginService) {}

  public async listTickets(): Promise<Ticket[]> {
    const accessToken = this._loginService.getOrRefreshAccessToken();
    const response = await fetch(
      TICKETS_ENDPOINT,
      {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
        method: 'GET',
      }
    );
    if (response.status !== 200) {
      throw Error(response.statusText);
    }
    return await response.json();
  }

  public async addTicket(ticketRequest: AddTicketRequest): Promise<Ticket> {
    const accessToken = this._loginService.getOrRefreshAccessToken();
    const response = await fetch(
      TICKETS_ENDPOINT,
      {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        method: 'POST',
        body: JSON.stringify(ticketRequest)
      }
    );
    if (response.status !== 201) {
      throw Error(response.statusText);
    }
    return await response.json();
  }

}
