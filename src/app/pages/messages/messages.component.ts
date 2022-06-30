import {Component, OnInit} from '@angular/core';
import {ChanelI} from 'src/app/interface/chanel.interface';
import {MessagesService} from 'src/app/services/messages.service';
import {FormControl} from '@angular/forms';
import {AppSettings} from '../../appSettings';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  //Variables de Form
  mensajeForm = new FormControl('');

  //Variables
  user_avatar = '';
  channel_avatar = '';
  channel_name = '';
  channel_users: string[] = [];
  data_mennsages: any[] = [];
  res_user_name_chat: any = [];
  id_user_sesion = localStorage.getItem('iduser_sesion');
  num_user_channel = 0;

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.user_email_id_login();
    this.channel();
    this.menssages();
  }

  channel() {
    this.messagesService.Chanel_data().subscribe(resp => {
      const channelResponse: ChanelI = resp;
      this.channel_avatar =
        AppSettings.API_ENDPOINT +
        'api/users/50/cd/' +
        channelResponse.data._id +
        '/kx.png';
      this.channel_name = channelResponse.data.nameDisplay;
      for (const nombuser of channelResponse.data['userIds']) {
        this.user_id_name_channel(nombuser);
      }
      this.num_user_channel = this.channel_users.length;
    });
  }
  user_id_name_channel(id: any) {
    this.messagesService.User_data_id(id).subscribe((data: any) => {
      const names_users_name = data.data['users'][0].name.names;
      const names_users_lastName = data.data['users'][0].name.lastName;
      const names_users = names_users_name + ' ' + names_users_lastName;
      this.channel_users.push(names_users);
      this.user_id_name(id);
      this.num_user_channel = this.num_user_channel + 1;
    });
  }

  user_id_name(id: any) {
    this.messagesService.User_data_id(id).subscribe((data: any) => {
      const names_users_name = data.data['users'][0].name.names;
      const names_users_lastName = data.data['users'][0].name.lastName;
      const names_users = names_users_name + ' ' + names_users_lastName;
      this.res_user_name_chat.push({id, names_users});
    });
  }
  user_names: any;
  mensagges_array: any = [];
  menssages() {
    this.messagesService.listMessages().subscribe((resp: any) => {
      const mesaggeResponse = resp;
      let users_reactions: any;
      let i = 0;
      //console.log(mesaggeResponse);
      for (const data_m of mesaggeResponse) {
        if (data_m.reactions === undefined) {
          users_reactions = 0;
        } else {
          users_reactions = data_m.reactions;
        }

        if (data_m.contentType === 'application/pdf') {
          const datapdf = JSON.parse(data_m.content);
          this.mensagges_array[i] = {
            mensaje: datapdf.url,
            dataname: datapdf.name,
            id_user: data_m.sentBy,
            reactions: users_reactions,
            contentType: data_m.contentType,
          };
        } else if (data_m.contentType === 'image/png') {
          const dataimg = JSON.parse(data_m.content);
          this.mensagges_array[i] = {
            mensaje: dataimg.original,
            id_user: data_m.sentBy,
            reactions: users_reactions,
            contentType: data_m.contentType,
          };
        } else {
          this.mensagges_array[i] = {
            mensaje: data_m.content,
            id_user: data_m.sentBy,
            reactions: users_reactions,
            contentType: data_m.contentType,
          };
        }
        i = i + 1;
      }
      //console.log(mesaggeResponse);
    });
    this.data_mennsages = this.mensagges_array;
  }

  user_email_avatar(): void {
    const user_mail = localStorage.getItem('email')!;
    this.messagesService.User_data(user_mail).subscribe(resp => {
      const userResponse = resp;
      this.user_avatar = userResponse.data['users'][0]['avatar'].small;
    });
  }

  user_email_id_login(): void {
    const user_mail = localStorage.getItem('email')!;
    this.messagesService.User_data(user_mail).subscribe(resp => {
      const userResponse = resp;
      localStorage.setItem(
        'iduser_sesion',
        (this.user_avatar = userResponse.data['users'][0]['_id'])
      );
    });
  }

  img_user(id_user: string, name_user: string) {
    name_user = name_user.substring(-1, 1);
    const user_avatar =
      AppSettings.API_ENDPOINT +
      'api/users/50/' +
      name_user +
      '/' +
      id_user +
      '/kx.png';
    return user_avatar;
  }

  enviarmensaje() {
    const data = {
      channel: '628250ff4288210008c8bda0',
      content: this.mensajeForm.value,
      contentType: 'text/plain',
      isSaved: 2,
      sentBy: this.id_user_sesion,
    };
    //console.log(data);
    this.messagesService
      .writeMessages(data)
      .subscribe(resp => this.menssages());
    this.mensajeForm = new FormControl('');
  }
}
