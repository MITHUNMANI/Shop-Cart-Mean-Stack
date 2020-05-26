import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginserviceService } from './login/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {  // interface name

  constructor(public loginUser: LoginserviceService, public myRoute: Router) {
  }
  canActivate(): boolean {
    if (!this.loginUser.isLoggedIn()) {
      this.myRoute.navigateByUrl('/login');
    }
    return this.loginUser.isLoggedIn();
  }
}
