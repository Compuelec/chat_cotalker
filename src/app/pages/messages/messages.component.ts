import {Component, OnInit} from '@angular/core';
import {MessagesService} from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: [],
})
export class MessagesComponent implements OnInit {
  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.messagesService.listMessages().subscribe((resp: any) => {
      console.log(resp);
    });
  }
}
