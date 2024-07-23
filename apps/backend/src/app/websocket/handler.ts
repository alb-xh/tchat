import { Logger } from '@nestjs/common';
import { SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

const logger = new Logger();

export const Handler = (event: string) => (target: object, property: string, descriptor: any): void => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (client: Socket, msg: any) {
    logger.debug(`Request: ${JSON.stringify(msg)}`, event);

    const reply = await originalMethod.call(this, msg);
    if (!reply) { return; }

    logger.debug(`Response: ${JSON.stringify(reply)}`, event);
    client.emit(event, reply);
  }

  ConnectedSocket()(descriptor, 'value', 0);
  MessageBody()(descriptor, 'value', 1);
  SubscribeMessage(event)(target, property, descriptor);
}
