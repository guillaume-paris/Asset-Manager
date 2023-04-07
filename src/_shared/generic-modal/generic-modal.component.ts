import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnChanges {
  @Input() showInput: boolean = false;
  @Output() hideOutput = new EventEmitter<void>();

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

  initializeModal(): void {
    this.modalEl = document.getElementById('genericModal');
    this.modal = new bootstrap.Modal(this.modalEl! as Element, {
      keyboard: false
    });
    this.modal.show();
    console.log("showInput: " + this.showInput);
  }

  destroyModal(): void {
    console.log("showInput: " + this.showInput);
    if (this.modal) {
      this.hideOutput.emit();
      this.modal.hide();
    }
    this.modalEl = null;
    this.modal = null;
  }
}
