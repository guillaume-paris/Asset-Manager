import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILogin } from 'src/_shared/models/auth.model';
import { AuthService } from 'src/_shared/services/auth.service';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() setConnected = new EventEmitter<string>();

  isLoading = false;

  constructor(private authService: AuthService, private toastService: GenericToastService) { }

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
    this.isLoading = true;
    this.authService.login(usernameEmail, password).subscribe((data: ILogin) => {
      this.isLoading = false;
      if (data.success) {
        this.error_login_msg = undefined;
        this.toastService.showToast(data.title, data.message, "success");
        this.authService.activateRoute(true);
        this.setConnected.emit(data.username);
        this.closeModalHandler(true);
      } else {
        this.toastService.showToast(data.title, data.message, "danger");
        this.error_login_msg = data.message;
      }
    }, (error) => {
      this.isLoading = false;
      const data: ILogin = error.error;
      this.toastService.showToast((data.title ? data.title : "Network Error"), (data.message ? data.message : "Oops, the server can't be reached, try again later."), "danger");
      this.error_login_msg = data.message;
    });
  }

  closeModalHandler(isConnected: boolean = false): void {
    this.error_login_msg = undefined;
    this.loginForm.reset();
    if (!isConnected)
      this.setConnected.emit('');
    this.closeModal.emit();
  }
}
