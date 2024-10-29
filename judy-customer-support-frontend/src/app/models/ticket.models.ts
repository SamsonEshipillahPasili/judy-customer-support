export interface Ticket {
  id: number;
  title: string;
  description: string;
  is_resolved: boolean;
  owner: number;
  created_at: string;
  resolved_at: string | null;
}

export interface AddTicketRequest {
  title: string
  description: string
}

export interface UpdateTicketRequest {
  title: string
  description: string
}

export interface ResolveTicketRequest {
  is_resolved: true
}

