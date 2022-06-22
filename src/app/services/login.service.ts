import {Injectable} from '@angular/core';
import {LoginI} from '../interface/login.interface';
import {Login_ResponseI} from '../interface/response.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'https://demo.cotalker.com/';

  constructor(private http: HttpClient) {}

  loginByEmail(form: LoginI): Observable<Login_ResponseI> {
    const address = this.url + 'auth/local';
    return this.http.post<Login_ResponseI>(address, form);
  }
}
