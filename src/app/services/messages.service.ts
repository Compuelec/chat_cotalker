import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {ChanelI} from '../interface/chanel.interface';
import {AppSettings} from '../appSettings';
import {UserI} from '../interface/users.interface';
import {MessageI} from '../interface/messages.interface';

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

  User_data_id(id_user: string) {
    const address = AppSettings.API_ENDPOINT + 'api/v2/users?id=' + id_user;
    return this.http.get(address, this.httpOptions);
  }

  Chanel_data(): Observable<ChanelI> {
    const address =
      AppSettings.API_ENDPOINT + 'api/v2/channels/628250ff4288210008c8bda0';
    return this.http.get<ChanelI>(address, this.httpOptions);
  }

  listMessages() {
    const address =
      AppSettings.API_ENDPOINT +
      'api/v1/messages/channel/628250ff4288210008c8bda0/modified/5000000000000?until=false&mpp=50';
    return this.http.get(address, this.httpOptions);
  }

  writeMessages(datos: MessageI): Observable<MessageI> {
    const address = AppSettings.API_ENDPOINT + 'api/v1/messages';
    return this.http.post<MessageI>(
      address,
      JSON.stringify(datos),
      this.httpOptions
    );
  }
}
