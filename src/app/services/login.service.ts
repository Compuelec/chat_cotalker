import {Injectable} from '@angular/core';
import {LoginI} from '../interface/login.interface';
import {Login_ResponseI} from '../interface/response.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppSettings} from '../appSettings';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginByEmail(form: LoginI): Observable<Login_ResponseI> {
    const address = AppSettings.API_ENDPOINT + 'auth/local';
    return this.http.post<Login_ResponseI>(address, form);
  }
}
