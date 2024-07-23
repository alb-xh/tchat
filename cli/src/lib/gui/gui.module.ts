import { Module } from '@nestjs/common';
import { render } from 'ink';
import { resolve } from 'node:path';

import { EventsModule } from '../events/events.module.js';
import { EventManager } from '../events/event-manager.js';
import { FileStorage } from '../components/file-storage.component.js';
import { getDirname } from '../helpers.js';
import { Gui } from './gui.js';

@Module({
  imports: [ EventsModule ],
  providers: [
    {
      provide: FileStorage,
      useValue: new FileStorage(resolve(getDirname(), './storage.json')),
    },
    {
      provide: Gui,
      useFactory: (em: EventManager, storage: FileStorage) => new Gui(em, storage, render),
      inject: [ EventManager, FileStorage ],
    },
  ],
  exports: [ Gui ],
})
export class GuiModule {}
