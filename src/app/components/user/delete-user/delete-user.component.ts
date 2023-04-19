import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';
import { UserService } from 'src/_shared/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  @Output() closePopupEvent = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() row!: IGenericTableRow;

  constructor(private userService: UserService, private toastService: GenericToastService) { }

  hideModal(): void {
    this.closePopupEvent.emit();
  }

  onDelete(): void {
    this.userService.deleteUser(this.row.id)
      .subscribe(res => {
        if (!res.success) {
          this.toastService.showToast(res.title, res.message, 'danger');
        }
        else {
          this.toastService.showToast(res.title, res.message, 'success');
          this.hideModal();
          this.delete.emit();
        }
      }
    );
  }
}
