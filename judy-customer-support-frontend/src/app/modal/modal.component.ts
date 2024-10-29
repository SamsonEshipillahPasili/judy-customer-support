import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

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
  @Output() cancelEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  constructor() {

  }

  cancelModal(): void {
    this.cancelEvent.emit();
  }

  confirm(): void {
    this.confirmEvent.emit();
  }
}
