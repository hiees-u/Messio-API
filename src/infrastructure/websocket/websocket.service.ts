import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';

@Injectable()
export class WebsocketService {
  constructor(private readonly websocketGateway: WebsocketGateway) {}

  sendMessageToRoom(roomId: string, message: string) {
    this.websocketGateway.sendMessageToRoom(roomId, message);
    //logic add job
  }
}
