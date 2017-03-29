import { Injectable } from '@angular/core';

import { BackEndService } from '../shared/back-end.service';

@Injectable()
export class AuthService {

  private loggedIn: boolean;

  constructor(private backEnd: BackEndService) { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(): void {
    this.backEnd.checkServer()
      .subscribe(console.log, console.log);
  }

  logout(): void {

  }

}
