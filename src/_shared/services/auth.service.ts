import { Injectable } from '@angular/core';
import { GenericToastService } from './generic-toast.service';
import { Observable, Subscription, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ILogin, IRegister } from '../models/auth.model';

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

  constructor(private toastService: GenericToastService, private http: HttpClient) {
    this.isLoggedIn = false;
  }

  isRouteAuthenticated(): boolean {
    return this.isLoggedIn;
  };

  activateRoute(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  login(usernameEmail: string, password: string): Observable<ILogin> {
    if (this.isRouteAuthenticated()) {
      return of({ success: false, message: "Already connected", username: "", token: "", expires_in: 0 });
    }
    let URL: string = "assets/login.json";
    let body = JSON.stringify({ username: usernameEmail, password: password});
    return this.http.get<ILogin>(URL);
    // return this.http.post<ILogin>(URL, body);
  }

  register(username: string, email: string, password: string): Observable<IRegister> {
    if (this.isRouteAuthenticated()) {
      return of({ success: false, message: "Already connected", username: "", token: "", expires_in: 0 });
    }
    let URL: string = "assets/register.json";
    let body = JSON.stringify({ username, email, password });
    return this.http.get<IRegister>(URL);
    // return this.http.post<ILogin>(URL, body);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.toastService.showToast("Logout successfully", "You are no longer connected to your account.", "success");
  }
}