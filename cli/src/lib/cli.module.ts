import { Module } from '@nestjs/common';

import { ConnectCommand } from './commands/connect.command.js';
import { GuiModule } from './gui/gui.module.js';
import { EventsModule } from './events/events.module.js';

@Module({
  imports: [ EventsModule, GuiModule ],
  providers: [ ConnectCommand ],
  exports: [ ],
})
export class CliModule {}
