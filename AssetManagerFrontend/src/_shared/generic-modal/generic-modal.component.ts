import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';

declare function activate(): void;
declare function deactivate(): void;

@Component({
  selector: 'generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnChanges {
  @Input() showInput : boolean = false;
  @Output() closePopupEvent = new EventEmitter();

  show : boolean = false;
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.showInput != null && this.showInput != undefined)
      this.show = this.showInput
      
    if(this.show)  
      activate();
    else if(changes['showInput'].previousValue == true && changes['showInput'].currentValue == false)
      deactivate();
  }

  toggle(): void {
      this.show = !this.show;
      this.closePopupEvent.emit();
  }
}
