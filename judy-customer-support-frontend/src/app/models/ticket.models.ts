export interface Ticket {
  id: number;
  title: string;
  description: string;
  is_resolved: boolean;
  owner: number;
  created_at: string;
  resolved_at: string | null;
}
