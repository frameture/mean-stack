import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  public canActivate(): boolean {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate([ '/login' ]);
      return false;
    }
    return true;
  }
}
