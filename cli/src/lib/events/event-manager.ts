import _ from 'lodash';
import readline from 'node:readline';
import process from 'node:process';
import EventEmitter from 'node:events';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventManager {
  static readonly Events = {
    TERMINATE: 'terminate',
    KEYPRESS: 'keypress',
    TAB_CHANGE: 'tab_change',
  };

  private readonly eventEmitter = new EventEmitter();

  constructor () {
    this.bindKeypress();
  }

  isValidEvent (event: string): boolean {
    return Object.values(EventManager.Events).includes(event);
  }

  emit (event: string, payload?: Record<string, unknown>): void {
    if (this.isValidEvent(event)) {
      this.eventEmitter.emit(event, payload);
    }
  }

  on (event: string, cb: (payload?: Record<string, unknown>) => void) {
    if (this.isValidEvent(event)) {
      this.eventEmitter.on(event, cb);
    }
  }

  private bindKeypress () {
    readline.emitKeypressEvents(process.stdin);

    process.stdin.on('keypress', (_, key) => {
      if (key.name === 'c' && key.ctrl === true) {
        this.eventEmitter.emit(EventManager.Events.TERMINATE);
        return;
      }

      if (key) {
        this.eventEmitter.emit(EventManager.Events.KEYPRESS, { key: key.name, ctrl: key.ctrl ?? false });
        return;
      }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
}