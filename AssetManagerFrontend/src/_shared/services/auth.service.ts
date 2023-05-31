import { Injectable } from '@angular/core';
import { GenericToastService } from './generic-toast.service';
import { Observable, Subscription, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogin, IRegister } from '../models/auth.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../env/environment';

const API_URL = environment.apiUrl;

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

  // Add a new BehaviorSubject
  private loggedInStatus = new BehaviorSubject<boolean>(this.isLoggedIn);
  loggedInStatus$ = this.loggedInStatus.asObservable();

  constructor(private toastService: GenericToastService, private http: HttpClient, private router: Router) {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.loggedInStatus.next(this.isLoggedIn);
  }

  isRouteAuthenticated(): boolean {
    return this.isLoggedIn;
  };

  activateRoute(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  login(usernameEmail: string, password: string): Observable<ILogin> {
    if (this.isRouteAuthenticated()) {
      return of({ success: false, title: "An error occured", message: "You are already connected", username: "", token: "", expiresIn: 0 });
    }
    const URL = `${API_URL}/UserAccounts/login`;
    const body = JSON.stringify({
      Username: usernameEmail,
      Email: usernameEmail,
      Password: password
    });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ILogin>(URL, body, { headers: headers }).pipe(
      tap((data: ILogin) => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
        }
      })
    );
  }

  register(username: string, email: string, password: string): Observable<IRegister> {
    if (this.isRouteAuthenticated()) {
      return of({ success: false, title: "An error occured", message: "You are already connected", username: "", token: "", expiresIn: 0 });
    }
    let URL: string = "http://localhost:61150/api/UserAccounts/";
    let body = JSON.stringify({
      Id: 0,
      Username: username,
      Email: email,
      Password: password
    });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IRegister>(URL, body, { headers: headers }).pipe(
      tap((data: IRegister) => {
        if (data.success) {
          localStorage.setItem('token', data.token);
        }
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedInStatus.next(this.isLoggedIn);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(["/"]);
    this.toastService.showToast("Logout successfully", "You are no longer connected to your account.", "success");
  }
}