import { Command, CommandRunner } from 'nest-commander';

import { Gui } from '../gui/gui.js';
import { EventManager } from '../events/event-manager.js';

@Command({ name: 'connect', description: 'CLI for chatting with peers' })
export class ConnectCommand extends CommandRunner {
  constructor (
    private readonly eventManager: EventManager,
    private readonly gui: Gui,
  ) {
    super();
  }

  async run(): Promise<void> {
    this.eventManager.on(EventManager.Events.TERMINATE, () => {
      setTimeout(() => process.exit(0), 100);
    });

    this.gui.render();
  }
}