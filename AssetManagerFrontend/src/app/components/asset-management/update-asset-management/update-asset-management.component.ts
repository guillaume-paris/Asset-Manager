import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGenericTable, IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';
import { AssetManagementService } from 'src/_shared/services/asset.management.service';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';

@Component({
  selector: 'app-update-asset-management',
  templateUrl: './update-asset-management.component.html',
  styleUrls: ['./update-asset-management.component.css']
})
export class UpdateAssetManagementComponent implements OnInit {
  @Output() closePopupEvent = new EventEmitter();
  @Output() update = new EventEmitter();
  @Input() row!: IGenericTableRow;

  users: IGenericTable;
  assets!: IGenericTableRow[];

  editAssetManagementForm: FormGroup = new FormGroup ({ 
    user: new FormControl('', Validators.required),
    asset: new FormControl('', Validators.required),
  });

  constructor(private assetManagementService: AssetManagementService, private toastService: GenericToastService) {
    this.users = assetManagementService.getUsers();
  }

  ngOnInit(): void {
    this.editAssetManagementForm.setValue({
      user: this.row.values[0],
      asset: this.row.values[1]
    });
    this.assets = this.assetManagementService.getAssetsForUser(this.editAssetManagementForm.value.user);
    let currentObject: IGenericTableRow = {
      values: [this.row.values[1]],
      id: this.row.id
    }
    this.assets.push(currentObject);
  }

  refreshAssetsForUser(): void {
    this.assets = this.assetManagementService.getAssetsForUser(this.editAssetManagementForm.value.user);
  }

  hideModal(): void {
    this.editAssetManagementForm.reset();
    this.closePopupEvent.emit();
  }

  saveEditAssetManagement(): void {
    if (!this.editAssetManagementForm.valid) {
      this.editAssetManagementForm.markAllAsTouched();
      return;
    }
    let newAssetManagement: IGenericTableRow = {
      values: [
        this.editAssetManagementForm.value.user,
        this.editAssetManagementForm.value.asset
      ],
      id: this.row.id
    }
    
    this.assetManagementService.updateAssetManagement(this.row.id, newAssetManagement)
      .subscribe(res => {
        if (!res.success) {
          this.toastService.showToast(res.title, res.message, 'danger');
        }
        else {
          this.toastService.showToast(res.title, res.message, 'success');
          this.hideModal();
          this.update.emit();
        }
      }
    );
  }
}
