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
  isLoggedIn: boolean = false;

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
    if (this.authService.login(usernameEmail, password)) {
      this.error_login_msg = undefined;
      this.isLoggedIn = true;
      let possibleUsername = this.authService.getUsername(usernameEmail, password)
      this.setConnected.emit(possibleUsername ? possibleUsername : usernameEmail);
      this.closeModalHandler(true);
    }
    else {
      this.error_login_msg = 'Incorrect username / email or password';
      this.isLoggedIn = false;
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
