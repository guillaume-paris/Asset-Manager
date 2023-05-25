import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';
import { AssetService } from 'src/_shared/services/asset.service';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';

@Component({
  selector: 'app-update-asset',
  templateUrl: './update-asset.component.html',
  styleUrls: ['./update-asset.component.css']
})
export class UpdateAssetComponent implements OnInit {
  @Output() closePopupEvent = new EventEmitter();
  @Output() update = new EventEmitter();
  @Input() row!: IGenericTableRow;

  editAssetForm: FormGroup = new FormGroup ({ 
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });

  constructor(private assetService: AssetService, private toastService: GenericToastService) { }

  ngOnInit(): void {
    this.editAssetForm.setValue({
      name: this.row.values[0],
      description: this.row.values[1],
      brand: this.row.values[2],
      price: this.row.values[3],
      category: this.row.values[4]
    });
  }

  hideModal(): void {
    this.editAssetForm.reset();
    this.closePopupEvent.emit();
  }

  saveEditAsset(): void {
    if (!this.editAssetForm.valid) {
      this.editAssetForm.markAllAsTouched();
      return;
    }
    const updatedAsset: IGenericTableRow = {
      values: [
        this.editAssetForm.value.name,
        this.editAssetForm.value.description,
        this.editAssetForm.value.brand,
        this.editAssetForm.value.price,
        this.editAssetForm.value.category
      ],
      id: this.row.id
    }
    
    this.assetService.updateAsset(this.row.id, updatedAsset)
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
