import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {ModalService} from '../services/modal.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen: boolean | null = false;
  @Input() title = '';
  @Output() cancelEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  protected isModalLoading: Observable<boolean>;

  constructor(private _modalService: ModalService) {
    this.isModalLoading = this._modalService.isModalLoading();
  }

  cancelModal(): void {
    this.cancelEvent.emit();
  }

  confirm(): void {
    this.confirmEvent.emit();
  }
}
