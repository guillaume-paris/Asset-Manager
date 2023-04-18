import { Injectable } from '@angular/core';
import { IGenericTable, IGenericTableRow } from '../models/generic-crud-table.model';
import data from '../../app/config/asset.config.json'

@Injectable()
export class AssetService {

  assets: IGenericTable;

  constructor() {
    // Load data from the json file
    this.assets = data;
  }

  getAssets(): IGenericTable {
    return this.assets;
  }

  getAsset(id: number): IGenericTableRow {
    return this.assets.rows.find(user => user.id === id)!;
  }
  
  createAsset(newAsset: IGenericTableRow): boolean {
    const newId = this.assets.rows.length + 1;
    if (!this.assets.rows.push({ ...newAsset, id: newId })) {
      return false;
    }
    return true;
  }

  updateAsset(id: number, updatedAsset: IGenericTableRow): boolean {
    const userIndex = this.assets.rows.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.assets.rows[userIndex] = {
    ...this.assets.rows[userIndex],
    ...updatedAsset
    };
    return true;
  }

  deleteAsset(id: number): boolean {
    const userIndex = this.assets.rows.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.assets.rows.splice(userIndex, 1);
    return true;
  }
}
