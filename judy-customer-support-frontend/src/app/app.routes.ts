import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ListTicketsComponent} from './list-tickets/list-tickets.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'tickets/list', component: ListTicketsComponent},
];
