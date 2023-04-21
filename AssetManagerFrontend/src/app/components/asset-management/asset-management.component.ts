import { Component } from '@angular/core';
import { IGenericTable, IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';
import { AssetManagementService } from 'src/_shared/services/asset.management.service';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';

@Component({
  selector: 'app-asset-management',
  templateUrl: './asset-management.component.html',
  styleUrls: ['./asset-management.component.css']
})
export class AssetManagementComponent {
  assetManagement: IGenericTable;
  assetManagementSelected!: IGenericTableRow;

  createModal: boolean = false;
  updateModal: boolean = false;
  deleteModal: boolean = false;

  constructor(private assetManagementService: AssetManagementService, private toastService: GenericToastService) {
    this.assetManagement = assetManagementService.getAssetsManagement();
  }

  toggleCreateModal(): void {
    this.createModal =!this.createModal;
  }

  toggleUpdateModal(): void {
    this.updateModal =!this.updateModal;
  }

  toggleDeleteModal(): void {
    this.deleteModal =!this.deleteModal;
  }

  deleteAssetManagement(): void {
    this.assetManagement = this.assetManagementService.getAssetsManagement();
  }

  updateAssetManagement(): void {
    this.assetManagement = this.assetManagementService.getAssetsManagement();
  }

  createAssetManagement(): void {
    this.assetManagement = this.assetManagementService.getAssetsManagement();
  }
}
