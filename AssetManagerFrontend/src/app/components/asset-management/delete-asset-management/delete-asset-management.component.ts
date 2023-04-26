import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';
import { AssetManagementService } from 'src/_shared/services/asset.management.service';
import { AssetService } from 'src/_shared/services/asset.service';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';

@Component({
  selector: 'app-delete-asset-management',
  templateUrl: './delete-asset-management.component.html',
  styleUrls: ['./delete-asset-management.component.css']
})
export class DeleteAssetManagementComponent {
  @Output() closePopupEvent = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() row!: IGenericTableRow;

  constructor(private assetManagementService: AssetManagementService, private toastService: GenericToastService) { }

  hideModal(): void {
    this.closePopupEvent.emit();
  }

  onDelete(): void {
    this.assetManagementService.deleteAssetManagement(this.row.id)
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
