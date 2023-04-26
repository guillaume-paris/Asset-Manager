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
    this.assetService.deleteAsset(this.row.id)
      .subscribe(res => {
        if (!res.success) {
          this.toastService.showToast(res.title, res.message, 'danger');
        }
        else {
          this.toastService.showToast(res.title, res.message, 'success');
          this.hideModal();
          this.delete.emit();
        }
      }
    );
  }
}
