import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/_shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() setConnected = new EventEmitter<string>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.error_login_msg = undefined;
  }
  
  error_login_msg: string  | undefined;

  loginForm: FormGroup = new FormGroup ({ 
    usernameEmail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    let usernameEmail = this.loginForm.get('usernameEmail')?.value;
    let password = this.loginForm.get('password')?.value;
    let username = this.authService.login(usernameEmail, password);
    if (username) {
      this.error_login_msg = undefined;
      this.setConnected.emit(username);
      this.closeModalHandler(true);
    } else {
      this.error_login_msg = 'Incorrect username / email or password';
    }
  }

  closeModalHandler(isConnected: boolean = false): void {
    this.error_login_msg = undefined;
    this.loginForm.reset();
    if (!isConnected)
      this.setConnected.emit('');
    this.closeModal.emit();
  }
}
