import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AuthService } from 'src/_shared/services/auth.service';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showLoginModal: boolean = false;
  showRegisterModal: boolean = false;

  isLoggedIn: boolean = false;
  username: string | undefined;
  
  constructor(private authService: AuthService, private router: Router, private toastService: GenericToastService) { }
  
  ngOnInit(): void {
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger && toastLiveExample) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show();
      });
    }
  }

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
