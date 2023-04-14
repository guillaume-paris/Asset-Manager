import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilter, IGenericTable, IGenericTableRow } from '../models/generic-crud-table.model';
import { IAsset, IAssetFilter } from '../models/asset.model';

@Component({
  selector: 'generic-crud-table',
  templateUrl: './generic-crud-table.component.html',
  styleUrls: ['./generic-crud-table.component.css']
})
export class GenericCrudTableComponent {
  @Input()
  datas!: IGenericTable;
  @Input()
  dataSelected!: IGenericTableRow;

  @Output()
  toggleCreateModal: EventEmitter<boolean> = new EventEmitter();
  @Output()
  toggleUpdateModal: EventEmitter<boolean> = new EventEmitter();
  @Output()
  toggleDeleteModal: EventEmitter<boolean> = new EventEmitter();

  searchBarText: string = "";

  constructor() {

  }

  filterValues(rows: IGenericTableRow[]): IGenericTableRow[] {
    let rowsFiltered = rows.filter(row => {
      let rowValues = row.row.map(value => 
        value.toString().toLowerCase());
        return rowValues.some(value => value.includes(this.searchBarText.toLowerCase()));
    });
    return rowsFiltered;
  }

  onCreate(): void {
    this.toggleCreateModal.emit();
  }

  onUpdate(dataSelected: IGenericTableRow): void {
    this.dataSelected = dataSelected;
    this.toggleUpdateModal.emit();
  }

  onDelete(dataSelected: IGenericTableRow): void {
    this.dataSelected = dataSelected;
    this.toggleDeleteModal.emit();
  }
}
