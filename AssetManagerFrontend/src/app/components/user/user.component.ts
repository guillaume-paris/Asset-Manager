import { Component } from '@angular/core';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';
import { UserService } from 'src/_shared/services/user.service';
import { IGenericTable, IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';
import { IUser } from 'src/_shared/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent{
  users: IGenericTable;
  userSelected!: IGenericTableRow;

  createModal: boolean = false;
  updateModal: boolean = false;
  deleteModal: boolean = false;

  constructor(private userService: UserService, private toastService: GenericToastService) {
    this.users = userService.getUsers();
  }

  toggleCreateModal(): void {
    this.createModal =!this.createModal;
  }

  toggleUpdateModal(): void {
    this.updateModal =!this.updateModal;
  }

  toggleDeleteModal(): void {
    this.deleteModal =!this.deleteModal;
  }

  deleteUser(): void {
    this.users = this.userService.getUsers();
  }

  updateUser(): void {
    this.users = this.userService.getUsers();
  }

  createUser(): void {
    this.users = this.userService.getUsers();
  }
}
