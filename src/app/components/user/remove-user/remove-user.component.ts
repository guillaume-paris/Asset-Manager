import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';
import { UserService } from 'src/_shared/services/user.service';
import { User } from 'src/_shared/models/user.model';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent {
  @Output() closePopupEvent = new EventEmitter();
  @Input() user!: User;

  constructor(private toastService: GenericToastService, private userService: UserService) {}

  hideModal(): void {
    this.closePopupEvent.emit();
  }

  saveRemoveUser(): void {
    if (!this.userService.removeUserDataById(this.user.id)) {
      this.toastService.showToast('Oops, an error occured', 'Sorry, an error occured, try again later', 'danger');
    }
    this.toastService.showToast('User removed', 'User has been removed successfully', 'success');
    this.closePopupEvent.emit();
  }
}
