import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { IRegister } from 'src/_shared/models/auth.model';
import { AuthService } from 'src/_shared/services/auth.service';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() closeModal = new EventEmitter();
  @Output() setConnected = new EventEmitter<string>();

  constructor(private authService: AuthService, private toastService: GenericToastService) { }

  error_login_msg: string  | undefined;

  registerForm: FormGroup = new FormGroup({ 
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMatch': true };
    }
    return null;
  }

  register(): void {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    let username = this.registerForm.get('username')?.value;
    let email = this.registerForm.get('email')?.value;
    let password = this.registerForm.get('password')?.value;
    this.authService.register(username, email, password).subscribe((data: IRegister) => {
      if (data.success) {
        this.error_login_msg = undefined;
        this.toastService.showToast("Register successfull", data.message, "success");
        this.authService.activateRoute(true);
        this.setConnected.emit(data.username);
        this.closeModalHandler(true);
      } else {
        this.toastService.showToast("Register failed", data.message, "danger");
        this.error_login_msg = data.message;
      }
    });
  }

  closeModalHandler(isConnected: boolean = false): void {
    this.registerForm.reset();
    if (!isConnected)
      this.setConnected.emit('');
    this.closeModal.emit();
  }
}
