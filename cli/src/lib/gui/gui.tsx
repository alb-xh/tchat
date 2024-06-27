import React from 'react';
import { ReactNode } from 'react';
import { Injectable } from "@nestjs/common";

import { EventManager } from '../events/event-manager.js';
import { MainLayout } from './layouts/main.layout.js';

@Injectable()
export class Gui {
  constructor (
    private readonly em: EventManager,
    private readonly renderer: (node: ReactNode) => unknown,
  ) {}

  render () {
    this.renderer(<MainLayout em={this.em} />);
  }
}