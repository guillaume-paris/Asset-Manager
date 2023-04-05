import { Component } from '@angular/core';
import { AuthService } from 'src/_auth/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn: boolean = false;
  title = 'AssetManagement';
  username: string | undefined;

  registerForm: FormGroup = new FormGroup({ 
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.passwordMatchValidator });
  loginForm: FormGroup = new FormGroup ({ 
    usernameEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  
  constructor(private authService: AuthService) { }

  register(): void {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      console.log("touched");
      return;
    }
    let username = this.registerForm.get('username')?.value;
    let email = this.registerForm.get('email')?.value;
    let password = this.registerForm.get('password')?.value;
    this.authService.register(username, email, password);
    this.isLoggedIn = true;
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
