import { render } from 'ink';
import { Injectable } from "@nestjs/common";

import { NavBarComponent } from "./nav-bar.component.js";

@Injectable()
export class Gui {
  constructor (private readonly navBar: NavBarComponent) {}

  render () {
    render(
      this.navBar.render([ 'Login', 'Register' ])
    );
  }
}