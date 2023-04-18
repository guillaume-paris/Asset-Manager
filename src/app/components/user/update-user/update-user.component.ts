import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/_shared/services/user.service';
import { IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  @Output() closePopupEvent = new EventEmitter();
  @Output() update = new EventEmitter();
  @Input() row!: IGenericTableRow;

  editUserForm: FormGroup = new FormGroup ({ 
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required)
  }, { validators: this.passwordMatchValidator });

  constructor(private toastService: GenericToastService, private userService: UserService) { }

  ngOnInit(): void {
    this.editUserForm.setValue({
      firstName: this.row.values[0],
      lastName: this.row.values[1],
      email: this.row.values[2],
      role: this.row.values[3]
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMatch': true };
    }
    return null;
  }

  hideModal(): void {
    this.editUserForm.reset();
    this.closePopupEvent.emit();
  }

  saveEditUser(): void {
    if (!this.editUserForm.valid) {
      this.editUserForm.markAllAsTouched();
      return;
    }
    let newUser: IGenericTableRow = {
      values: [
        this.editUserForm.value.firstName,
        this.editUserForm.value.lastName,
        this.editUserForm.value.email,
        this.editUserForm.value.role
      ],
      id: this.row.id
    }
    if (!this.userService.updateUser(this.row.id, newUser)) {
      this.toastService.showToast('Oops, an error occured', 'Sorry, an error occured, try again later', 'danger');
    }
    this.toastService.showToast('Edit succesfully','User has been edited successfully','success');
    this.hideModal();
    this.update.emit();
  }
}
