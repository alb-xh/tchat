import { Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
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
import { EntityManager } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { User } from './db/entities/user.entity';
import { Unauthorized, NotFound, Ok, Conflict, BadRequest } from './responses';
import { Token } from './token';


@WebSocketGateway({ path: '/ws', cors: { origin: '*' } })
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(WsGateway.name);
  private connectionsMap: Map<string, User> = new Map()
  @WebSocketServer() server: Server;

  constructor (
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
  ) {}

  async handleConnection (client: Socket) {
    this.logger.debug('Connecting');
  }

  async handleDisconnect(client: Socket) {
    this.logger.debug('Disconnecting');
  }

  @SubscribeMessage('me')
  async handleMe(
    @ConnectedSocket() client: Socket,
    @MessageBody() msg: { token: string },
  ): Promise<void> {
    this.logger.debug('Me');

    if (!msg.token) {
      client.emit('me', new BadRequest());
      return;
    }

    const secret = this.configService.getOrThrow('TOKEN_SECRET');

    try {
      const userId = await new Token(secret).verify(msg.token);
      const user = await this.entityManager.findOneBy(User, { id: userId });

      if (!user) {
        client.emit('me', new Unauthorized());
        return;
      }

      client.emit('me', new Ok({ id: user.id, username: user.username }));
    } catch {
      client.emit('me', new Unauthorized());
    }
  }

  @SubscribeMessage('login')
  async handleLogin(
    @ConnectedSocket() client: Socket,
    @MessageBody() msg: { username: string, password: string },
  ): Promise<void> {
    this.logger.debug('Login');

    if (msg.username.length < 6 || msg.password.length < 8) {
      client.emit('login', new BadRequest());
      return;
    }

    const user = await this.entityManager.findOneBy(User, { username: msg.username });
    if (!user) {
      client.emit('login', new NotFound());
      return;
    }

    if(!(await compare(msg.password, user.password))) {
      client.emit('login', new Unauthorized());
      return;
    }

    const secret = this.configService.getOrThrow('TOKEN_SECRET');
    const token = await new Token(secret).generate(user.id);

    client.emit('login', new Ok({ token }))
  }

  @SubscribeMessage('register')
  async handleRegister(
    @ConnectedSocket() client: Socket,
    @MessageBody() msg: { username: string, password: string },
  ) {
    this.logger.debug('register');

    if (msg.username.length < 6 || msg.password.length < 8) {
      client.emit('register', new BadRequest());
      return;
    }

    if (await this.entityManager.existsBy(User, { username: msg.username })) {
      client.emit('register', new Conflict());
      return;
    }

    const user = await this.entityManager.save(User, {
      username: msg.username,
      password: await hash(msg.password, 10),
    });

    const secret = this.configService.getOrThrow('TOKEN_SECRET');
    const token = new Token(secret).generate(user.id);

    client.emit('register', new Ok({ token }));
  }
}