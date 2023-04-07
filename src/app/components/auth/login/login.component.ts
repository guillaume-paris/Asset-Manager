import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/_shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() closeModal = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.error_login_msg = undefined;
    
  }
  
  error_login_msg: string  | undefined;
  isLoggedIn: boolean = false;
  username: string | undefined;

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
      this.username = possibleUsername ? possibleUsername : usernameEmail
      this.closeModalHandler();
    }
    else {
      this.error_login_msg = 'Incorrect username / email or password';
      this.isLoggedIn = false;
    }
  }

  closeModalHandler(): void {
    this.error_login_msg = undefined;
    this.loginForm.reset();
    this.closeModal.emit();
  }
}
