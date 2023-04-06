import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnChanges {
  @Input() showInput: boolean = false;

  show: boolean = false;

  private modalEl: HTMLElement | null = null;
  private modal: bootstrap.Modal | null = null;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showInput'] && changes['showInput'].currentValue) {
      this.initializeModal();
    } else {
      this.destroyModal();
    }
  }

  private initializeModal(): void {
    this.modalEl = document.getElementById('genericModal');
    this.modal = new bootstrap.Modal(this.modalEl! as Element, {
      keyboard: false
    });
    this.modal.show();
  }

  private destroyModal(): void {
    if (this.modal) {
      this.modal.hide();
    }
    this.modalEl = null;
    this.modal = null;
  }
}
