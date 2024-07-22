import readline from 'node:readline';
import process from 'node:process';
import EventEmitter from 'node:events';
import { io } from "socket.io-client";

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EventManager {
  static readonly Events = {
    TERMINATE: 'terminate',
    KEYPRESS: 'keypress',
    TAB_CHANGE: 'tab_change',
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
    ME: 'me',
  };

  private readonly logger = new Logger(EventManager.name);
  private readonly eventEmitter = new EventEmitter();
  private readonly socket = io('http://localhost:3000/', { path: '/ws' });
  private readonly eventToEmitterMap = {
    [EventManager.Events.KEYPRESS]: this.eventEmitter,
    [EventManager.Events.TERMINATE]: this.eventEmitter,
    [EventManager.Events.TAB_CHANGE]: this.eventEmitter,
    [EventManager.Events.LOGIN]: this.socket,
    [EventManager.Events.LOGOUT]: this.socket,
    [EventManager.Events.ME]: this.socket,
    [EventManager.Events.REGISTER]: this.socket,
  };

  constructor () {
    this.bindKeypress();
  }

  isValidEvent (event: string): boolean {
    return Object.values(EventManager.Events).includes(event);
  }

  emit (event: string, payload?: Record<string, unknown>): void {
    if (this.isValidEvent(event)) {
      this.getEmitter(event)
        .emit(event, payload);
    }
  }

  on (event: string, cb: (payload?: Record<string, unknown>) => void) {
    if (this.isValidEvent(event)) {
      this.getEmitter(event)
        .on(event, cb)
    }
  }

  off (event: string, cb: (payload?: Record<string, unknown>) => void) {
    if (this.isValidEvent(event)) {
      this.getEmitter(event)
        .off(event, cb)
    }
  }

  private getEmitter (event: string): any {
    return this.eventToEmitterMap[event];
  }

  private bindKeypress () {
    readline.emitKeypressEvents(process.stdin);

    process.stdin.on('keypress', (_, key) => {
      this.logger.debug(`Key pressed: ${JSON.stringify(key)}`);

      if (key.name === 'c' && key.ctrl === true) {
        this.eventEmitter.emit(EventManager.Events.TERMINATE);
        return;
      }

      if (key) {
        this.eventEmitter.emit(EventManager.Events.KEYPRESS, key);
        return;
      }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
}