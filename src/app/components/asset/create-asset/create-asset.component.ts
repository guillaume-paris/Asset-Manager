import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';
import { AssetService } from 'src/_shared/services/asset.service';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent {
  @Output() closePopupEvent = new EventEmitter();
  @Output() create = new EventEmitter();

  createAssetForm: FormGroup = new FormGroup ({ 
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });

  constructor(private assetService: AssetService, private toastService: GenericToastService) { }

  hideModal(): void {
    this.closePopupEvent.emit();
  }

  saveCreateAsset(): void {
    if (!this.createAssetForm.valid) {
      this.createAssetForm.markAllAsTouched();
      return;
    }
    let newAsset: IGenericTableRow = {
      values: [
        this.createAssetForm.value.name,
        this.createAssetForm.value.description,
        this.createAssetForm.value.brand,
        this.createAssetForm.value.price,
        this.createAssetForm.value.quantity,
        this.createAssetForm.value.category
      ],
      id: 0
    }
    if (!this.assetService.createAsset(newAsset)) {
      this.toastService.showToast('Oops, an error occured', 'Sorry, an error occured, try again later', 'danger');
    }
    this.toastService.showToast('Edit succesfully','User has been edited successfully','success');
    this.hideModal();
    this.create.emit();
  }
}
