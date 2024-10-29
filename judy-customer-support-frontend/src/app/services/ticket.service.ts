import {Injectable} from '@angular/core';
import {LoginService} from './login.service';
import {AddTicketRequest, ResolveTicketRequest, Ticket, UpdateTicketRequest} from '../models/ticket.models';
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
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
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

  public async updateTicket(ticketId: number, ticketRequest: UpdateTicketRequest): Promise<Ticket> {
    const accessToken = this._loginService.getOrRefreshAccessToken();
    const response = await fetch(
      TICKETS_ENDPOINT + ticketId,
      {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(ticketRequest)
      }
    );
    if (response.status !== 200) {
      throw Error(response.statusText);
    }
    return await response.json();
  }

   public async resolveTicket(ticketId: number, ticketRequest: ResolveTicketRequest): Promise<Ticket> {
    const accessToken = this._loginService.getOrRefreshAccessToken();
    const response = await fetch(
      TICKETS_ENDPOINT + ticketId,
      {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify(ticketRequest)
      }
    );
    if (response.status !== 200) {
      throw Error(response.statusText);
    }
    return await response.json();
  }

   public async deleteTicket(ticketId: number): Promise<void> {
    const accessToken = this._loginService.getOrRefreshAccessToken();
    const response = await fetch(
      TICKETS_ENDPOINT + ticketId,
      {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        method: 'DELETE',
      }
    );
    if (response.status !== 204) {
      throw Error(response.statusText);
    }
  }

}
