import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { BackEndService } from './back-end.service';
import { User } from './shared/models/user';

@Injectable()
export class UserService {

  private loggedIn = false;
  private user: any;

  constructor(private be: BackEndService) { }

  login(data): Observable<any> {
    return this.be.login(data)
      .map(res => this.handleResponse(res));
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAuthorized(user): boolean {
    return this.isLoggedIn() && this.user.username === user.username;
  }

  setUser(user): void {
    this.user = user;
  }

  private handleResponse(res) {
    res = res.json();
    if (res.success) {
      localStorage.setItem('auth_token', res.auth_token);
      this.loggedIn = true;
    }
    return res;
  }

}
