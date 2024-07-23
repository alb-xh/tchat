import { Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EntityManager } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { User } from '../db/entities/user.entity';
import { Unauthorized, NotFound, Ok, Conflict, BadRequest, WsResponse } from './responses';
import { Token } from './token';
import { Handler } from './handler';

@WebSocketGateway({ path: '/ws', cors: { origin: '*' } })
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(Gateway.name);
  private connectionsMap: Map<string, User> = new Map();
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

  @Handler('me')
  async me (msg: { token: string }): Promise<WsResponse> {
    if (!msg.token) { return new BadRequest(); }

    const secret = this.configService.getOrThrow('TOKEN_SECRET');

    try {
      const userId = await new Token(secret).verify(msg.token);
      const user = await this.entityManager.findOneBy(User, { id: userId });

      if (!user) { return new Unauthorized(); }
      return new Ok({ id: user.id, username: user.username });
    } catch {
      return new Unauthorized();
    }
  }

  @Handler('login')
  async login (msg: { username: string, password: string }): Promise<WsResponse> {
    if (msg.username.length < 4 || msg.password.length < 4) { return new BadRequest(); }

    const user = await this.entityManager.findOneBy(User, { username: msg.username });
    if (!user) { return new NotFound(); }

    if(!(await compare(msg.password, user.password))) { return new Unauthorized(); };

    const secret = this.configService.getOrThrow('TOKEN_SECRET');
    const token = await new Token(secret).generate(user.id);

    return new Ok({ token });
  }

  @Handler('register')
  async register (msg: { username: string, password: string }): Promise<WsResponse> {
    if (msg.username.length < 4 || msg.password.length < 4) { return new BadRequest(); }

    if (await this.entityManager.existsBy(User, { username: msg.username })) { return new Conflict(); }

    const user = await this.entityManager.save(User, {
      username: msg.username,
      password: await hash(msg.password, 10),
    });

    const secret = this.configService.getOrThrow('TOKEN_SECRET');
    const token = await new Token(secret).generate(user.id);

    return new Ok({ token });
  }
}