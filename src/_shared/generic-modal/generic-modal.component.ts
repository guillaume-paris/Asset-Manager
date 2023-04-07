import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnChanges {
  @Input() show: boolean | undefined;
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      if (changes['show'].currentValue) {
        console.log(changes);
        this.showModal();
      } else {
        this.hideModal();
      }
    }
  }
  showModal() {
    this.show = true;
    this.showChange.emit(this.show);
  }

  hideModal(): void {
    this.show = false;
    this.showChange.emit(this.show);
  }
}
