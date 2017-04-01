import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class BackEndService {

  private readonly URL = 'http://localhost:3334';

  constructor(private http: Http) { }

  getUser(username: string): Observable<any> {
    return this.http.get(this.URL + '/user/' + username);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.URL + '/users');
  }

  register(user: { username: string, password: string }): Observable<any> {
    let data = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.URL + '/register', { data }, options);
  }

}
