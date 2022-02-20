import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.accountService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
    return this.canActivate(route, state);
  }
}
