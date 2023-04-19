import { Injectable } from '@angular/core';
import { IGenericTable, IGenericTableRow } from '../models/generic-crud-table.model';
import data from '../../app/config/asset.management.config.json'
import { AssetService } from './asset.service';
import { UserService } from './user.service';
import { IAssetManagement } from '../models/asset.management.model';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../models/api.model';
import { Observable } from 'rxjs';

@Injectable()
export class AssetManagementService {

  assetsManagement: IGenericTable;
  assets: IGenericTable;
  users: IGenericTable;

  constructor(private assetService: AssetService, private userService: UserService, private http: HttpClient) {
    // Load data from the json file
    this.assetsManagement = data;
    this.assets = assetService.getAssets();
    this.users = userService.getUsers();
  }

  getUsers(): IGenericTable {
    return this.userService.getUsers();
  }

  getAssets(): IGenericTableRow[] {
    return this.assetService.getAssets().rows;
  }

  getAssetsForUser(user: string): IGenericTableRow[] {
    let assetsOfUser: string[] = [];
    let assetsAvailable: IGenericTableRow[] = [];
    if (user) {
      this.assetsManagement.rows.filter(row => {
        if (row.values[0] === user)
          assetsOfUser.push(row.values[1])
      });
      this.assets.rows.filter(asset => {
        if (!assetsOfUser.includes(asset.values[0]))
          assetsAvailable.push(asset);
      });
    }
    return assetsAvailable;
  }

  getAssetsManagement(): IGenericTable {
    const URL: string = "assets/asset-management/getAssetsManagement.json";
    const assetsManagement: IGenericTableRow[] = [];

    this.http.get<IAssetManagement>(URL).subscribe((data: IAssetManagement) => {
      data.assetsManagement.forEach((assetManagement) => {
        const rowAssetManagement: IGenericTableRow = {
          values: [assetManagement.user, assetManagement.asset],
          id: assetManagement.id
        }
        assetsManagement.push(rowAssetManagement);
      })
    });
    this.assetsManagement.rows = assetsManagement;
    return this.assetsManagement;
  }
  
  createAssetManagement(newAssetManagement: IGenericTableRow): Observable<IResponse> {
    const URL: string = "assets/asset-management/createAssetManagement.json";
    const body = JSON.stringify({ 
      user: newAssetManagement.values[0],
      asset: newAssetManagement.values[1],
    });
    
    return this.http.get<IResponse>(URL);
  }

  updateAssetManagement(id: number, newAssetManagement: IGenericTableRow): Observable<IResponse> {
    const URL: string = "assets/asset-management/updateAssetManagement.json";
    const body = JSON.stringify({ 
      user: newAssetManagement.values[0],
      asset: newAssetManagement.values[1],
      id: id,
    });
  
    return this.http.get<IResponse>(URL);
  }

  deleteAssetManagement(id: number): Observable<IResponse> {
    const URL: string = "assets/asset-management/deleteAssetManagement.json";
    const body = JSON.stringify({ 
      id: id,
    });

    return this.http.get<IResponse>(URL);
  }
}
