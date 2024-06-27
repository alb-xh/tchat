
import { Box } from 'ink';
import { ReactNode } from 'react';
import { Injectable } from "@nestjs/common";

import { EventManager } from '../events/event-manager.js';
import { FullDivider } from './components/divider.component.js';
import { Logo } from './components/logo.component.js';
import { TabBar } from "./components/tab-bar.component.js";
import { LoginPage } from './pages/login.page.js';

@Injectable()
export class Gui {
  private static PUBLIC_TABS = [ 'Login', 'Register' ];

  constructor (
    private readonly em: EventManager,
    private readonly renderer: (node: ReactNode) => unknown,
  ) {}

  render () {
    this.renderer(
      <Box flexDirection='column'>
        <FullDivider />
        <Logo />
        <FullDivider />
        <TabBar em={this.em} tabs={Gui.PUBLIC_TABS}/>
        <LoginPage em={this.em} />
      </Box>
    );
  }
}