import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  tokens: any = localStorage.getItem('token');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.tokens,
    }),
  };

  listMessages() {
    const url =
      'https://demo.cotalker.com/api/v1/messages/channel/628250ff4288210008c8bda0/modified/2022-05-16T00:00:00.000Z';
    return this.http.get(url, this.httpOptions);
  }
}
