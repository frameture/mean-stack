import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  private lock;

  constructor(private router: Router) {
    this.setLock();
  }

  login(): void {
    this.lock.show();
  }

  logout(): void {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    this.router.navigate([ '/users' ]);
  }

  isLoggedIn(): boolean {
    return tokenNotExpired();
  }

  private setLock(): void {
    this.lock = new Auth0Lock(
      'DAjXyietLOcv9SEaV23wx4ejrix9E3UB',
      'frameture.eu.auth0.com'
    );

    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (err, profile) => {
        if (err) {
          console.error(err);
          return;
        }
        localStorage.setItem('profile', JSON.stringify(profile));
      });

      this.lock.hide();
    });
  }
}
