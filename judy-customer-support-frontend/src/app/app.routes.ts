import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ListTicketsComponent} from './list-tickets/list-tickets.component';
import {authGuard} from './auth.guard';

export const routes: Routes = [
  {path: '', component: ListTicketsComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
];
