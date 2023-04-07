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

  showLoginModal: boolean = false;
  showRegisterModal: boolean = false;

  hideLoginModal(): void {
    this.showLoginModal = false;
  }

  hideRegisterModal(): void {
    this.showRegisterModal = false;
  }

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
    this.error_login_msg = undefined;
  }

  closeModal(modal: any) {
    modal.hide();
    this.registerForm.reset();
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
