import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class BackEndService {

  private readonly URL = 'http://localhost:3001';

  constructor(private http: Http) { }

  getUser(username: string): Observable<any> {
    return this.http.get(this.URL + '/user/' + username);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.URL + '/users');
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(this.URL + '/isAuth');
  }

  login(data): Observable<any> {
    data = JSON.stringify(data);
    return this.http.post(this.URL + '/login', { data });
  }

  logout(): Observable<any> {
    return this.http.get(this.URL + '/logout');
  }

  register(user: { username: string, password: string }): Observable<any> {
    const data = JSON.stringify(user);
    return this.http.post(this.URL + '/register', { data });
  }

}
