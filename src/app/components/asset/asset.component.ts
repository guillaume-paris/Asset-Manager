import { Component } from '@angular/core';
import data from '../../config/asset.config.json'
import { IGenericTable, IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';

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

  constructor() {
    this.assets = data;
    console.log(this.assets);
  }

  toggleCreateModal(): void {
    this.createModal =!this.createModal;
  }

  toggleUpdateModal(): void {
    this.updateModal =!this.updateModal;
  }

  toggleDeleteModal(): void {
    this.deleteModal =!this.deleteModal;
    console.log("assetSelected :", this.assetSelected)
  }
}
