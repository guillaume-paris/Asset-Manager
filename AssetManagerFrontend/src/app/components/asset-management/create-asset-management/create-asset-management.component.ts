import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGenericTable, IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';
import { AssetManagementService } from 'src/_shared/services/asset.management.service';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';

@Component({
  selector: 'app-create-asset-management',
  templateUrl: './create-asset-management.component.html',
  styleUrls: ['./create-asset-management.component.css']
})
export class CreateAssetManagementComponent {
  @Output() closePopupEvent = new EventEmitter();
  @Output() create = new EventEmitter();

  users: IGenericTable;
  assets: IGenericTableRow[];

  createAssetManagementForm: FormGroup = new FormGroup ({ 
    user: new FormControl('', Validators.required),
    asset: new FormControl('', Validators.required),
  });

  constructor(private assetManagementService: AssetManagementService, private toastService: GenericToastService) {
    this.users = assetManagementService.getUsers();
    this.assets = this.assetManagementService.getAssets();
  }

  refreshAssetsForUser(): void {
    this.assets = this.assetManagementService.getAssetsForUser(this.createAssetManagementForm.value.user);
  }

  hideModal(): void {
    this.createAssetManagementForm.reset();
    this.closePopupEvent.emit();
  }

  saveCreateAssetManagement(): void {
    if (!this.createAssetManagementForm.valid) {
      this.createAssetManagementForm.markAllAsTouched();
      return;
    }
    let newAssetManagement: IGenericTableRow = {
      values: [
        this.createAssetManagementForm.value.user,
        this.createAssetManagementForm.value.asset
      ],
      id: 0
    }

    this.assetManagementService.createAssetManagement(newAssetManagement)
      .subscribe(res => {
        if (!res.success) {
          this.toastService.showToast(res.title, res.message, 'danger');
        }
        else {
          this.toastService.showToast(res.title, res.message, 'success');
          this.hideModal();
          this.create.emit();
        }
      }
    );
  }
}
