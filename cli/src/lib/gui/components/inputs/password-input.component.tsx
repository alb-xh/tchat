import React from 'react';

import { EventManager } from '../../../events/event-manager.js';
import { TextInput } from './text-input.component.js';

type Props = {
  em: EventManager,
  onChange?: (value: string) => void,
  defaultValue?: string,
  disable?: boolean,
}

export const PasswordInput = (props: Props) => {
  return (<TextInput {...props} specialChar='*' />);
}