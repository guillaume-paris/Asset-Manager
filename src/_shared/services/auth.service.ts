import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  credentials = [{
    username: 'user',
    email: 'user@example.com',
    password: 'password'
  }];

  isRouteAuthenticated(): boolean {
    console.log("isRoute authenticated : ", this.isLoggedIn);
    return this.isLoggedIn;
  };

  login(usernameEmail: string, password: string): boolean {
    if (this.isRouteAuthenticated()) {
      throw new Error('Already logged in');
    }
    let isCredentialsMatch = false;
    this.credentials.forEach(c => {
      if (c.email === usernameEmail || c.username === usernameEmail && c.password === password) {
        isCredentialsMatch = true;
      }
    });
    if (isCredentialsMatch) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  getUsername(email: string, password: string): string {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in');
    }
    let isCredentialsMatch = false;
    let username = "";
    this.credentials.forEach(c => {
      if (c.email === email && c.password === password) {
        isCredentialsMatch = true;
        username = c.username;
      }
    });
    if (isCredentialsMatch) {
      this.isLoggedIn = true;
      return username;
    }
    return "";
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
    return ("username");
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}