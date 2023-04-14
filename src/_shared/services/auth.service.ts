import { Injectable } from '@angular/core';

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

  constructor() {
    this.isLoggedIn = true;
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
      return (username);
    }
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
    return ("username");
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}