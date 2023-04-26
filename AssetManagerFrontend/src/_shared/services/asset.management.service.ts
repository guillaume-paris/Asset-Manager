import { Injectable } from '@angular/core';
import { IGenericTable, IGenericTableRow } from '../models/generic-crud-table.model';
import data from '../../app/config/asset.management.config.json'
import { AssetService } from './asset.service';
import { UserService } from './user.service';
import { IAssetManagement } from '../models/asset.management.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      console.log("assetsOfUser: ", assetsOfUser);
      this.assets.rows.filter(asset => {
        console.log("asset : ", asset);
        if (!assetsOfUser.includes(asset.values[0])) {
          assetsAvailable.push(asset);
        }
      });
      console.log("assetsAvailable: ", assetsAvailable);
    }
    return assetsAvailable;
  }

  getAssetsManagement(): IGenericTable {
    const URL: string = "http://localhost:61150/api/AssetManagements";
    const assetsManagement: IGenericTableRow[] = [];

    this.http.get<Array<IAssetManagement>>(URL).subscribe((data: Array<IAssetManagement>) => {
      data.forEach((assetManagement) => {
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
    const URL: string = "http://localhost:61150/api/AssetManagements";
    const body = JSON.stringify({
      id: 1,
      user: newAssetManagement.values[0],
      asset: newAssetManagement.values[1],
    });
    
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IResponse>(URL, body, { headers: headers });
  }

  updateAssetManagement(id: number, newAssetManagement: IGenericTableRow): Observable<IResponse> {
    const URL: string = "http://localhost:61150/api/AssetManagements/" + id.toString();
    const body = JSON.stringify({ 
      user: newAssetManagement.values[0],
      asset: newAssetManagement.values[1],
      id: id,
    });
  
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IResponse>(URL, body, { headers: headers });
  }

  deleteAssetManagement(id: number): Observable<IResponse> {
    const URL: string = "http://localhost:61150/api/AssetManagements/" + id.toString();

    return this.http.delete<IResponse>(URL);
  }
}
