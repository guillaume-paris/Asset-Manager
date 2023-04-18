import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssetRoutingModule } from './asset-routing.module';
import { SharedModule } from 'src/_shared/shared.module';
import { AssetComponent } from './asset.component';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { UpdateAssetComponent } from './update-asset/update-asset.component';
import { DeleteAssetComponent } from './delete-asset/delete-asset.component';


@NgModule({
  declarations: [
    AssetComponent,
    CreateAssetComponent,
    UpdateAssetComponent,
    DeleteAssetComponent
  ],
  imports: [
    CommonModule,
    AssetRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AssetModule { }
