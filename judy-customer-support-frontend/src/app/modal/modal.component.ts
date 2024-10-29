import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {ModalService} from '../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen: boolean | null = false;
  @Input() title = '';

  constructor(private _modalService: ModalService) {

  }

  closeModal() {
    this._modalService.closeAllModals();
  }

  confirm() {

  }
}
