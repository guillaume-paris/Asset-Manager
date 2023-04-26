import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/_shared/services/user.service';
import { IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  @Output() closePopupEvent = new EventEmitter();
  @Output() create = new EventEmitter();

  createUserForm: FormGroup = new FormGroup ({ 
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required)
  }, { validators: this.passwordMatchValidator });

  constructor(private toastService: GenericToastService, private userService: UserService) { }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMatch': true };
    }
    return null;
  }

  hideModal(): void {
    this.createUserForm.reset();
    this.closePopupEvent.emit();
  }

  saveCreateUser(): void {
    if (!this.createUserForm.valid) {
      this.createUserForm.markAllAsTouched();
      return;
    }
    const newUser: IGenericTableRow = {
      values: [
        this.createUserForm.value.firstName,
        this.createUserForm.value.lastName,
        this.createUserForm.value.email,
        this.createUserForm.value.role
      ],
      id: 0
    }

    this.userService.createUser(newUser)
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
