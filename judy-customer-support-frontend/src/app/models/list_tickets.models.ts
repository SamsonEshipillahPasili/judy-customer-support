import {Ticket} from './ticket.models';

export interface ListTicketsState {
  isLoading: boolean
  errorMsg: string | null
  tickets: Ticket[] | null;
}
