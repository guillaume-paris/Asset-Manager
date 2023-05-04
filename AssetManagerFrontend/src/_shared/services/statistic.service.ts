import { Injectable } from '@angular/core';
import { AssetService } from './asset.service';
import { UserService } from './user.service';
import { IGenericTable, IGenericTableRow } from '../models/generic-crud-table.model';
import { IUserResult } from '../models/user.model';
import { Observable } from 'rxjs';
import { AssetManagementService } from './asset.management.service';

@Injectable()
export class StatisticService {

    users: IGenericTable | undefined;
    assets: IGenericTable | undefined;

    totalUsers: number = 0;
    freeUsers: number = 0;
    totalOfAsset: number = 0;
    freeAssets: number = 0;
  
    constructor(private assetService: AssetService, private userService: UserService, private assetManagementService: AssetManagementService) {
    }

    getUsers(): Observable<{totalUsers: number, users: IGenericTable}> {
        return this.userService.getUsersPagination(1, 10);
    }

    getAssets(): Observable<{totalAssets: number, assets: IGenericTable}> {
        return this.assetService.getAssetsPagination(1, 10);
    }

    getAssetsManagement(): Observable<{totalAssetsManagement: number, assetsManagement: IGenericTable}> {
        return this.assetManagementService.getAssetsManagementPagination(1, 10);
    }
}
