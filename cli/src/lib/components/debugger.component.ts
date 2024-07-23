import { resolve } from 'node:path';
import { writeFile } from 'fs/promises';

import { isProduction, getDirname } from "../helpers.js";

export class Debugger {
  static FILE = resolve(getDirname(), 'debug.txt');
  constructor (private readonly context: string) {}

  isEnabled () {
    return !isProduction();
  }

  async log (...messages: any[]): Promise<void> {
    if (!this.isEnabled()) { return; }

    await writeFile(
      Debugger.FILE,
      messages.map((msg) => `${new Date().toISOString()}: ${this.context}: ${JSON.stringify(msg)}`).join('\n'),
      { flag: 'a+' },
    );
  }
}