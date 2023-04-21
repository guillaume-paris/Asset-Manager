import { Component } from '@angular/core';
import { IGenericTable, IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';
import { AssetService } from 'src/_shared/services/asset.service';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent {
  assets: IGenericTable;
  assetSelected!: IGenericTableRow;

  createModal: boolean = false;
  updateModal: boolean = false;
  deleteModal: boolean = false;

  constructor(private assetService: AssetService, private toastService: GenericToastService) {
    this.assets = assetService.getAssets();
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

  deleteAsset(): void {
    this.assets = this.assetService.getAssets();
  }

  updateAsset(): void {
    this.assets = this.assetService.getAssets();
  }

  createAsset(): void {
    this.assets = this.assetService.getAssets();
  }
}
