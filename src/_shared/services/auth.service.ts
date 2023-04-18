import { Injectable } from '@angular/core';
import { GenericToastService } from './generic-toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean;
  credentials = [{
    username: 'user',
    email: 'user@example.com',
    password: 'password'
  }];

  constructor(private toastService: GenericToastService) {
    this.isLoggedIn = false;
  }

  isRouteAuthenticated(): boolean {
    return this.isLoggedIn;
  };

  login(usernameEmail: string, password: string): string {
    if (this.isRouteAuthenticated()) {
      return ("");
    }
    let isCredentialsMatch = false;
    let username: string = "";
    this.credentials.forEach(c => {
      if (c.email === usernameEmail || c.username === usernameEmail && c.password === password) {
        isCredentialsMatch = true;
        username = c.username;
      }
    });
    if (isCredentialsMatch) {
      this.isLoggedIn = true;
      this.toastService.showToast("Login successfull", "You have successfully logged into your account.", "success");
      return (username);
    }
    this.toastService.showToast("Login failed", "Username, Email or Password are wrong", "danger");
    return ("");
  }

  register(username: string, email: string, password: string): string {
    if (this.isRouteAuthenticated()) {
      return ("")
    }
    let isCredentialsMatch = false;
    this.credentials.forEach(c => {
      if (c.email === email || c.username === username) {
        isCredentialsMatch = true;
      }
    });
    if (isCredentialsMatch) {
      return ("")
    }
    this.credentials.push({
      username,
      email,
      password
    });
    this.isLoggedIn = true;
    this.toastService.showToast("Register successfully", "You have successfully created your account.", "success");
    return ("username");
  }

  logout(): void {
    this.isLoggedIn = false;
    this.toastService.showToast("Logout successfully", "You are no longer connected to your account.", "success");
  }
}