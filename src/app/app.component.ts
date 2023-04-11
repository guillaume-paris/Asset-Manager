import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from 'bootstrap';
import { AuthService } from 'src/_shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showLoginModal: boolean = false;
  showRegisterModal: boolean = false;

  isLoggedIn: boolean = false;
  username: string | undefined;
  
  constructor(private authService: AuthService, private router: Router) { }

  hideLoginModal(): void {
    this.showLoginModal = false;
  }

  hideRegisterModal(): void {
    this.showRegisterModal = false;
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = "";
    this.router.navigate(['/']);
  }

  setConnected(username: any): void {
    if (username) {
      this.username = username;
      this.isLoggedIn = true;
    }
  }
}
