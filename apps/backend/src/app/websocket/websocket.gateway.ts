import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

type Chat = {
  name: string,
  users: User[],
}

type User = {
  id: string,
  username: string,
}


@WebSocketGateway({ path: '/ws', cors: { origin: '*' } })
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private connectionsMap: Map<string, User> = new Map()
  @WebSocketServer() server: Server;

  async handleConnection (client: Socket) {
    //
  }

  async handleDisconnect(client: Socket) {
    //
  }

  @SubscribeMessage('login')
  async handleLogin(
    @ConnectedSocket() client: Socket,
    @MessageBody() msg: { username: string, password: string },
  ) {
    //
  }

  @SubscribeMessage('register')
  async handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() msg: { username: string, password: string },
  ) {
    //
  }
}