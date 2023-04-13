import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/_shared/services/user.service';
import { User } from 'src/_shared/models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  @Output() closePopupEvent = new EventEmitter();

  newUserForm: FormGroup = new FormGroup ({ 
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
    this.newUserForm.reset();
    this.closePopupEvent.emit();
  }

  saveNewUser(): void {
    if (!this.newUserForm.valid) {
      this.newUserForm.markAllAsTouched();
      return;
    }
    let newUser: User = {
      firstName: this.newUserForm.get('firstName')!.value,
      lastName: this.newUserForm.get('lastName')!.value,
      email: this.newUserForm.get('email')!.value,
      role: this.newUserForm.get('role')!.value,
      id: 0
    }
    if (!this.userService.addUser(newUser)) {
      this.toastService.showToast('Oops, an error occured', 'Sorry, an error occured, try again later', 'danger');
    }
    this.newUserForm.reset();
    this.toastService.showToast('Add successfully','User has been added succesfully','success');
    this.closePopupEvent.emit();
  }
}
