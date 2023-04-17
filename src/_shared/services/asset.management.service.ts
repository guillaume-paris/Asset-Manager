import { Injectable } from '@angular/core';
import { IGenericTable, IGenericTableRow } from '../models/generic-crud-table.model';
import data from '../../app/config/user.asset.management.json'
import { AssetService } from './asset.service';
import { UserService } from './user.service';

@Injectable()
export class AssetManagementService {

  assetManagement: IGenericTable;
  assets: IGenericTable;
  users: IGenericTable;

  constructor(private assetService: AssetService, private userService: UserService) {
    // Load data from the json file
    this.assetManagement = data;
    this.assets = assetService.getAssets();
    this.users = userService.getUsers();
  }

  getUsers(): IGenericTable {
    return this.users;
  }

  getAssetsForUser(user: IGenericTableRow): IGenericTableRow[] {
    let assetsAvailable: IGenericTableRow[];
    if (user) {
      assetsAvailable = this.assets.rows.filter(asset => {
        return asset.id === user.id;
      });
      return assetsAvailable
    }
    return [];
  }

  getAssetManagement(): IGenericTable {
    return this.assetManagement;
  }
  
  createAssetManagement(newAssetManagement: IGenericTableRow): boolean {
    const newId = this.assetManagement.rows.length + 1;
    this.assetManagement.rows.push({ ...newAssetManagement, id: newId });
    return true;
  }

  updateAssetManagement(id: number, newAssetManagement: IGenericTableRow): boolean {
    const userIndex = this.assetManagement.rows.findIndex(assetManagement => assetManagement.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.assetManagement.rows[userIndex] = {
      ...this.assetManagement.rows[userIndex],
      ...newAssetManagement
    };
    return true;
  }

  deleteAssetManagement(id: number): boolean {
    const userIndex = this.assetManagement.rows.findIndex(assetManagement => assetManagement.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.assetManagement.rows.splice(userIndex, 1);
    return true;
  }
}
