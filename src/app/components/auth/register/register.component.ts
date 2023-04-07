import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/_shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() closeModal = new EventEmitter();
  @Output() setConnected = new EventEmitter<string>();

  constructor(private authService: AuthService) { }

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
    let usernameForm = this.registerForm.get('username')?.value;
    let emailForm = this.registerForm.get('email')?.value;
    let passwordForm = this.registerForm.get('password')?.value;
    this.authService.register(usernameForm, emailForm, passwordForm);
    this.setConnected.emit(usernameForm);
    this.closeModalHandler(true);
  }

  closeModalHandler(isConnected: boolean = false): void {
    this.registerForm.reset();
    if (!isConnected)
      this.setConnected.emit('');
    this.closeModal.emit();
  }
}
