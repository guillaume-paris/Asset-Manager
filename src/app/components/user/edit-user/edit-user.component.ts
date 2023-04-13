import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/_shared/services/user.service';
import { User } from 'src/_shared/models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Output() closePopupEvent = new EventEmitter();
  @Input() user!: User;

  editUserForm: FormGroup = new FormGroup ({ 
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required)
  }, { validators: this.passwordMatchValidator });

  constructor(private toastService: GenericToastService, private userService: UserService) { }

  ngOnInit(): void {
    this.editUserForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      role: this.user.role
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
    if (!this.userService.editUserDataById(this.user.id, this.user)) {
      this.toastService.showToast('Oops, an error occured', 'Sorry, an error occured, try again later', 'danger');
    }
    this.toastService.showToast('Edit succesfully','User has been edited successfully','success');
    this.editUserForm.reset();
    this.closePopupEvent.emit();
  }
}
