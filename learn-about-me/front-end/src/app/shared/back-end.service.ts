import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BackEndService {

  private readonly URL = 'http://localhost:3333';

  constructor(private http: Http) { }

  checkServer(): Observable<any> {
    return this.http.get(this.URL);
  }

}
