import { Module } from '@nestjs/common';

import { EventManager } from '../events/event-manager.js';

@Module({
  providers: [ EventManager ],
  exports: [ EventManager ],
})
export class EventsModule {}
