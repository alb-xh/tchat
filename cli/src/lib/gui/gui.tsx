import { Box } from 'ink';
import { ReactNode } from 'react';
import { Injectable } from "@nestjs/common";


import { EventManager } from '../events/event-manager.js';
import { NavBar } from "./nav-bar.component.js";


@Injectable()
export class Gui {
  private static PUBLIC_TABS = [ 'Login', 'Register' ];

  constructor (
    private readonly em: EventManager,
    private readonly renderer: (node: ReactNode) => unknown,
  ) {}

  render () {
    this.renderer(
      <Box>
        <NavBar em={this.em} tabs={Gui.PUBLIC_TABS}/>
      </Box>
    );
  }
}