import { Injectable } from '@angular/core';
import { environment } from 'apps/web-client/src/environments/environment';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root',
})
export class FeedSocket extends Socket {
  constructor() {
    super({
      url: environment.WS_POST,
      options: {
        reconnection: true,
        transports: ['websocket'],
      },
    });
  }

  message() {
    this.emit('message', 'hello world');
  }

  userCreatedPost() {}
  getMessage() {
    return this.fromEvent<string>('message');
  }
}
