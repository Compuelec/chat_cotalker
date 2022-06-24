import {Component, OnInit} from '@angular/core';
import {ChanelI} from 'src/app/interface/chanel.interface';
import {MessageI} from 'src/app/interface/messages.interface';
import {MessagesService} from 'src/app/services/messages.service';
import {AppSettings} from '../../appSettings';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  user_avatar = '';
  channel_avatar = '';
  channel_name = '';
  name_user = '';
  channel_users: string[] = [];
  constructor(private messagesService: MessagesService) {}

  avatar = this.user_email();

  ngOnInit(): void {
    this.menssages();
    this.channel();
  }

  channel(): void {
    this.messagesService.Chanel_data().subscribe(resp => {
      const channelResponse: ChanelI = resp;
      this.channel_avatar =
        AppSettings.API_ENDPOINT +
        'api/users/50/cd/' +
        channelResponse.data._id +
        '/kx.png';
      this.channel_name = channelResponse.data.nameDisplay;
      for (const nombuser of channelResponse.data['userIds']) {
        const nom_user = this.user_id(nombuser);
        //this.channel_users = Object.values(nom_user!);
      }
      //this.channel_users = channelResponse.data['userIds'];

      console.log(this.channel_users);
    });
  }

  menssages(): void {
    this.messagesService.listMessages().subscribe(resp => {
      const mesaggeResponse: MessageI = resp;
      console.log(mesaggeResponse);
    });
  }

  user_email(): void {
    const user_mail = localStorage.getItem('email')!;
    this.messagesService.User_data(user_mail).subscribe(resp => {
      const userResponse = resp;
      const Dat_User = [
        {
          id: userResponse.data['users'][0]._id,
          names: userResponse.data['users'][0]['name'].names,
          email: userResponse.data['users'][0].email,
          avatar: userResponse.data['users'][0]['avatar'].small,
        },
      ];
      console.log(Dat_User);
      this.user_avatar = userResponse.data['users'][0]['avatar'].small;
    });
  }

  user_id(id: string): void {
    this.messagesService.User_data_id(id).subscribe(resp => {
      const userResponse = resp;
      const nom_u_channels =
        userResponse.data['users'][0]['name'].names +
        ' ' +
        userResponse.data['users'][0]['name'].lastName;
      const avatar_user_channels =
        userResponse.data['users'][0]['avatar'].small;

      this.channel_users.push(nom_u_channels);
      //console.log(arrayUser);
    });
  }
}
