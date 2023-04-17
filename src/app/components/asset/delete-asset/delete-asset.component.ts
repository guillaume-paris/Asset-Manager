import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';
import { AssetService } from 'src/_shared/services/asset.service';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';

@Component({
  selector: 'app-delete-asset',
  templateUrl: './delete-asset.component.html',
  styleUrls: ['./delete-asset.component.css']
})
export class DeleteAssetComponent {
  @Output() closePopupEvent = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() row!: IGenericTableRow;

  constructor(private assetService: AssetService, private toastService: GenericToastService) { }

  hideModal(): void {
    this.closePopupEvent.emit();
  }

  onDelete(): void {
    if (!this.assetService.deleteAsset(this.row.id)) {
      this.toastService.showToast('Oops, an error occured', 'Sorry, an error occured, try again later', 'danger');
    }
    this.toastService.showToast('Delete succesfully','User has been deleted successfully','success');
    this.hideModal();
    this.delete.emit();
  }
}
