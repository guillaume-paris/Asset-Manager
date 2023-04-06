import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/_shared/services/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loginModal: any;
  registerModal: any;
  
  isLoggedIn: boolean = false;
  title = 'AssetManagement';
  username: string | undefined;
  error_login_msg: string | undefined;

  registerForm: FormGroup = new FormGroup({ 
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.passwordMatchValidator });

  loginForm: FormGroup = new FormGroup ({ 
    usernameEmail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerModal = new window.bootstrap.Modal(
      document.getElementById('registerModal')
    );
    this.loginModal = new window.bootstrap.Modal(
      document.getElementById('loginModal')
    );
  }

  openModal(modal: any) {
    modal.show();
    this.registerForm.reset();
    this.loginForm.reset();
    this.error_login_msg = undefined;
  }

  closeModal(modal: any) {
    modal.hide();
    this.registerForm.reset();
    this.loginForm.reset();
  }

  register(): void {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    let username = this.registerForm.get('username')?.value;
    let email = this.registerForm.get('email')?.value;
    let password = this.registerForm.get('password')?.value;
    this.authService.register(username, email, password);
    this.isLoggedIn = true;
    this.username = username;
    this.closeModal(this.registerModal);
  }

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
      this.closeModal(this.loginModal);
    }
    else {
      this.error_login_msg = 'Incorrect username / email or password';
      this.isLoggedIn = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = "";
    this.router.navigate(['/']);
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMatch': true };
    }

    return null;
  }
}
