import { Module } from '@nestjs/common';

import { EventsModule } from '../events/events.module.js';
import { Gui } from './gui.js';
import { EventManager } from '../events/event-manager.js';
import { render } from 'ink';

@Module({
  imports: [ EventsModule ],
  providers: [
    {
      provide: Gui,
      useFactory: (em: EventManager) => new Gui(em, render),
      inject: [ EventManager ],
    },
  ],
  exports: [ Gui ],
})
export class GuiModule {}
