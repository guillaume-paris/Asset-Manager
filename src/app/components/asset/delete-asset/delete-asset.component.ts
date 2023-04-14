import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';

@Component({
  selector: 'app-delete-asset',
  templateUrl: './delete-asset.component.html',
  styleUrls: ['./delete-asset.component.css']
})
export class DeleteAssetComponent {
  @Output() closePopupEvent = new EventEmitter();
  @Input() row!: IGenericTableRow;

  hideModal(): void {
    this.closePopupEvent.emit();
  }

  onSave(): void {
    this.hideModal();
  }
}
