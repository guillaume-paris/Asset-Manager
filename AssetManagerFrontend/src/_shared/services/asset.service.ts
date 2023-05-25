import { Injectable } from '@angular/core';
import { IGenericTable, IGenericTableRow } from '../models/generic-crud-table.model';
import data from '../../app/config/asset.config.json'
import { IResponse } from '../models/api.model';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAsset, IAssetResult } from '../models/asset.model';

@Injectable()
export class AssetService {

  assets: IGenericTable;

  constructor(private http: HttpClient) {
    // Load data from the json file
    this.assets = data;
  }

  getAssets(): IGenericTable {
    const URL: string = "http://localhost:61150/api/Assets";
    const assets: IGenericTableRow[] = [];

    this.http.get<Array<IAsset>>(URL).subscribe((data: Array<IAsset>) => {
      data.forEach((asset) => {
        const rowAsset: IGenericTableRow = {
          values: [asset.name, asset.description, asset.brand, asset.price, asset.category, asset.createdAt.substring(0, 19).replace('T', ' '), asset.createdBy = "null"],
          id: asset.id
        }
        assets.push(rowAsset);
      })
    });
    this.assets.rows = assets;
    return this.assets;
  }

  getAssetCount(): Observable<number> {
    const URL: string = "http://localhost:61150/api/Assets/count";

    return this.http.get<number>(URL);
  }

  getAssetsPagination(pageIndex: number, pageSize: number): Observable<{totalAssets: number, assets: IGenericTable}> {
    const URL: string = "http://localhost:61150/api/Assets/pagination?pageIndex=" + pageIndex.toString() + "&pageSize=" + pageSize.toString();
    const assets: IGenericTable = this.assets;
    const listAsset: IGenericTableRow[] = [];

    return this.http.get<IAssetResult>(URL).pipe(map((data: IAssetResult) => {
      const totalAssets: number = data.totalAssets;
      data.assetsPaged.forEach((asset) => {
        const rowAsset: IGenericTableRow = {
          values: [asset.name, asset.description, asset.brand, asset.price, asset.category, asset.createdAt.substring(0, 19).replace('T', ' '), asset.createdBy = "null"],
          id: asset.id
        }
        listAsset.push(rowAsset);
      })
      assets.rows = listAsset;
      return {totalAssets, assets};
    }));
  }

  getFreeAssets(): Observable<{freeAssets: Array<IAsset>}> {
    const URL: string = "http://localhost:61150/api/Assets/free";
    return this.http.get<{freeAssets: Array<IAsset>}>(URL);
  }

  getFreeAssetCount(): Observable<number> {
    const URL: string = "http://localhost:61150/api/Assets/free/count";

    return this.http.get<number>(URL);
  }
  
  createAsset(newAsset: IGenericTableRow): Observable<IResponse> {
    const URL: string = "http://localhost:61150/api/Assets";
    const body = JSON.stringify({ 
      id: 1,
      name: newAsset.values[0],
      description: newAsset.values[1],
      brand: newAsset.values[2],
      price: newAsset.values[3],
      category: newAsset.values[4],
    });
    
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IResponse>(URL, body, { headers: headers });
  }

  updateAsset(id: number, updatedAsset: IGenericTableRow): Observable<IResponse> {
    const URL: string = "http://localhost:61150/api/Assets/" + id.toString();
    const body = JSON.stringify({ 
      name: updatedAsset.values[0],
      description: updatedAsset.values[1],
      brand: updatedAsset.values[2],
      price: updatedAsset.values[3],
      category: updatedAsset.values[4],
      id: id,
    });
  
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IResponse>(URL, body, { headers: headers });
  }

  deleteAsset(id: number): Observable<IResponse> {
    const URL: string = "http://localhost:61150/api/Assets/" + id.toString();

    return this.http.delete<IResponse>(URL);
  }
}
