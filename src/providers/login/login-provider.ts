import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
@Injectable()
export class LoginProvider {
  constructor(public http: HttpClient) {}

  authenticate(param: {email: string; passworrd: string}): Observable<any> {
    return this.http.post('https://reqres.in/api/login', param);
  }
}
