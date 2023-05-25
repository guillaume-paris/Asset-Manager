import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssetManagementRoutingModule } from './asset-management-routing.module';
import { CreateAssetManagementComponent } from './create-asset-management/create-asset-management.component';
import { UpdateAssetManagementComponent } from './update-asset-management/update-asset-management.component';
import { DeleteAssetManagementComponent } from './delete-asset-management/delete-asset-management.component';

import { SharedModule } from 'src/_shared/shared.module';
import { AssetManagementComponent } from './asset-management.component';


@NgModule({
  declarations: [
    AssetManagementComponent,
    CreateAssetManagementComponent,
    UpdateAssetManagementComponent,
    DeleteAssetManagementComponent
  ],
  imports: [
    CommonModule,
    AssetManagementRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AssetManagementModule { }
