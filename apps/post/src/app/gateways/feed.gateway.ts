import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class FeedGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('FeedGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected: ${client.id}`);
  }

  @SubscribeMessage('message')
  onMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.logger.log('message', data);
    this.server.emit('message', data);
  }

  @SubscribeMessage('joinFeedRoom')
  onJoin(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    client.join(data.room);
    client.emit('joinedRoom', data.room);
  }

  // @SubscribeMessage('feed')
  // onEvent(client: Socket, data: any): WsResponse<any> {}
}
