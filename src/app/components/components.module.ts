import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AssetComponent } from './asset/asset.component';
import { AssetManagementComponent } from './asset-management/asset-management.component';

@NgModule({
  declarations: [
    HomeComponent,
    UserComponent,
    AssetComponent,
    AssetManagementComponent
  ],
  imports: [
    ComponentsRoutingModule
  ]
})
export class ComponentsModule { }
