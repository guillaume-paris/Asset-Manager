import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/_auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'asset',
    canActivate: [AuthGuard],
    loadChildren: () => import('./asset/asset.module').then(m => m.AssetModule)
  },
  {
    path: 'asset-management',
    canActivate: [AuthGuard],
    loadChildren: () => import('./asset-management/asset-management.module').then(m => m.AssetManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
