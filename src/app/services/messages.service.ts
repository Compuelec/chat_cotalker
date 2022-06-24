import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {ChanelI} from '../interface/chanel.interface';
import {AppSettings} from '../appSettings';
import {MessageI} from '../interface/messages.interface';
import {UserI} from '../interface/users.interface';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  tokens = localStorage.getItem('token')!;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.tokens,
    }),
  };

  User_data(email: string): Observable<UserI> {
    const address = AppSettings.API_ENDPOINT + 'api/v2/users?email=' + email;
    return this.http.get<UserI>(address, this.httpOptions);
  }

  User_data_id(id_user: string): Observable<UserI> {
    const address = AppSettings.API_ENDPOINT + 'api/v2/users?id=' + id_user;
    return this.http.get<UserI>(address, this.httpOptions);
  }

  Chanel_data(): Observable<ChanelI> {
    const address =
      AppSettings.API_ENDPOINT + 'api/v2/channels/628250ff4288210008c8bda0';
    return this.http.get<ChanelI>(address, this.httpOptions);
  }

  listMessages(): Observable<MessageI> {
    const address =
      AppSettings.API_ENDPOINT +
      'api/v1/messages/channel/628250ff4288210008c8bda0/modified/2022-05-16T00:00:00.000Z';
    return this.http.get<MessageI>(address, this.httpOptions);
  }
}
