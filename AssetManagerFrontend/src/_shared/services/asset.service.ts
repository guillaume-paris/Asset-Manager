import { Injectable } from '@angular/core';
import { IGenericTable, IGenericTableRow } from '../models/generic-crud-table.model';
import data from '../../app/config/asset.config.json'
import { IResponse } from '../models/api.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAsset } from '../models/asset.model';

@Injectable()
export class AssetService {

  assets: IGenericTable;

  constructor(private http: HttpClient) {
    // Load data from the json file
    this.assets = data;
  }

  getAssets(): IGenericTable {
    const URL: string = "assets/asset/getAssets.json";
    const assets: IGenericTableRow[] = [];

    this.http.get<IAsset>(URL).subscribe((data: IAsset) => {
      data.assets.forEach((asset) => {
        const rowAsset: IGenericTableRow = {
          values: [asset.name, asset.description, asset.brand, asset.price, asset.quantity, asset.category],
          id: asset.id
        }
        assets.push(rowAsset);
      })
    });
    this.assets.rows = assets;
    return this.assets;
  }
  
  createAsset(newAsset: IGenericTableRow): Observable<IResponse> {
    const URL: string = "assets/asset/createAsset.json";
    const body = JSON.stringify({ 
      name: newAsset.values[0],
      description: newAsset.values[1],
      brand: newAsset.values[2],
      price: newAsset.values[3],
      quantiy: newAsset.values[4],
      category: newAsset.values[5]
    });
    
    return this.http.get<IResponse>(URL);
  }

  updateAsset(id: number, updatedAsset: IGenericTableRow): Observable<IResponse> {
    const URL: string = "assets/asset/updateAsset.json";
    const body = JSON.stringify({ 
      name: updatedAsset.values[0],
      description: updatedAsset.values[1],
      brand: updatedAsset.values[2],
      price: updatedAsset.values[3],
      quantiy: updatedAsset.values[4],
      category: updatedAsset.values[5],
      id: id,
    });
  
    return this.http.get<IResponse>(URL);
  }

  deleteAsset(id: number): Observable<IResponse> {
    const URL: string = "assets/asset/deleteAsset.json";
    const body = JSON.stringify({ 
      id: id,
    });

    return this.http.get<IResponse>(URL);
  }
}
