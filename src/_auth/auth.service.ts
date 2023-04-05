import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  credentials = [{
    username: 'user',
    email: 'user@example.com',
    password: 'password'
  }];

  isRouteAuthenticated(): boolean {
    return this.isLoggedIn;
  };

  login(email: string, password: string): void {
    if (this.isRouteAuthenticated()) {
      throw new Error('Already logged in');
    }
    this.credentials.forEach(c => {
      if (c.email === email && c.password === password) {
        this.isLoggedIn = true;
        return;
      }
      if (c.username === email && c.password === password) {
        this.isLoggedIn = true;
        return;
      }
    });
  }

  register(username: string, email: string, password: string): void {
    if (this.isRouteAuthenticated()) {
      throw new Error('Already logged in');
    }
    this.credentials.push({
      username,
      email,
      password
    });
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}