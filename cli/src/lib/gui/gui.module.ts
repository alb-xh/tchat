import { Module } from '@nestjs/common';

import { EventsModule } from '../events/events.module.js';
import { NavBarComponent } from './nav-bar.component.js';
import { Gui } from './gui.js';

@Module({
  imports: [ EventsModule ],
  providers: [ NavBarComponent, Gui ],
  exports: [ Gui ],
})
export class GuiModule {}
