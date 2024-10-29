import {Component} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {AddTicketComponent} from '../add-ticket/add-ticket.component';
import {ModalService} from '../services/modal.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ModalTypeEnum} from '../models/modal.models';
import {DeleteTicketComponent} from '../delete-ticket/delete-ticket.component';
import {EditTicketComponent} from '../edit-ticket/edit-ticket.component';
import {ResolveTicketComponent} from '../resolve-ticket/resolve-ticket.component';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [
    ModalComponent,
    AddTicketComponent,
    AsyncPipe,
    DeleteTicketComponent,
    EditTicketComponent,
    ResolveTicketComponent
  ],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css'
})
export class ListTicketsComponent {
  protected isAddTicketModalOpen: Observable<boolean>;
  protected isDeleteTicketModalOpen: Observable<boolean>;
  protected isEditTicketModalOpen: Observable<boolean>;
  protected isResolveTicketModalOpen: Observable<boolean>;

  constructor(
    private _modalService: ModalService,
    private _loginService: LoginService,
    private _router: Router
    ) {
    this.isAddTicketModalOpen = this._modalService.isModalOpen(ModalTypeEnum.ADD_TICKET_MODAL);
    this.isDeleteTicketModalOpen = this._modalService.isModalOpen(ModalTypeEnum.DELETE_TICKET_MODAL);
    this.isEditTicketModalOpen = this._modalService.isModalOpen(ModalTypeEnum.EDIT_TICKET_MODAL);
    this.isResolveTicketModalOpen = this._modalService.isModalOpen(ModalTypeEnum.RESOLVE_TICKET_MODAL);
  }

  public onCreateNewTicket(): void {
    this._modalService.openModal(ModalTypeEnum.ADD_TICKET_MODAL);
  }

  public onAddTicketCancel(): void {
    this._modalService.cancelModal(ModalTypeEnum.ADD_TICKET_MODAL);
  }

  public onAddTicketConfirm(): void {
    this._modalService.confirmModal(ModalTypeEnum.ADD_TICKET_MODAL);
  }

  public onDeleteTicket(): void {
    this._modalService.openModal(ModalTypeEnum.DELETE_TICKET_MODAL);
  }

  public onDeleteTicketCancel(): void {
    this._modalService.cancelModal(ModalTypeEnum.DELETE_TICKET_MODAL);
  }

  public onDeleteTicketConfirm(): void {
    this._modalService.confirmModal(ModalTypeEnum.DELETE_TICKET_MODAL);
  }

  public onEditTicket(): void {
    this._modalService.openModal(ModalTypeEnum.EDIT_TICKET_MODAL);
  }

  public onEditTicketCancel(): void {
    this._modalService.cancelModal(ModalTypeEnum.EDIT_TICKET_MODAL);
  }

  public onEditTicketConfirm(): void {
    this._modalService.confirmModal(ModalTypeEnum.EDIT_TICKET_MODAL);
  }

   public onResolveTicket(): void {
    this._modalService.openModal(ModalTypeEnum.RESOLVE_TICKET_MODAL);
  }

  public onResolveTicketCancel(): void {
    this._modalService.cancelModal(ModalTypeEnum.RESOLVE_TICKET_MODAL);
  }

  public onResolveTicketConfirm(): void {
    this._modalService.confirmModal(ModalTypeEnum.RESOLVE_TICKET_MODAL);
  }

  public onLogout(): void {
    this._loginService.logout();
    this._router.navigate(['/login']);
  }
}
