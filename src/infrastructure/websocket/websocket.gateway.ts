import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world! ' + client + ' ' + payload;
  }

  sendMessageToRoom(roomId: string, message: string) {
    this.server.to(roomId).emit('send-message', message);
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(roomId);
  }

  handleConnection(client: any, ...args: any[]): void {
    console.log('Client connected', client);
    console.log(' -> ', args);
  }

  handleDisconnect(client: any): void {
    console.log('Client disconnected', client);
  }
}
