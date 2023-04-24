import { Injectable } from '@angular/core';
import { GenericToastService } from './generic-toast.service';
import { Observable, Subscription, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      return of({ success: false, title: "An error occured", message: "You are already connected", username: "", token: "", expires_in: 0 });
    }
    let URL: string = "http://localhost:61150/api/UserAccounts/login";
    let body = JSON.stringify({
      "Id": 0,
      "Username": usernameEmail,
      "Email": usernameEmail,
      "Password": password
    });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ILogin>(URL, body, { headers: headers });
  }

  register(username: string, email: string, password: string): Observable<IRegister> {
    if (this.isRouteAuthenticated()) {
      return of({ success: false, title: "An error occured", message: "You are already connected", username: "", token: "", expires_in: 0 });
    }
    let URL: string = "http://localhost:61150/api/UserAccounts/";
    let body = JSON.stringify({
      "Id": 0,
      "Username": username,
      "Email": email,
      "Password": password
    });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IRegister>(URL, body, { headers: headers });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.toastService.showToast("Logout successfully", "You are no longer connected to your account.", "success");
  }
}