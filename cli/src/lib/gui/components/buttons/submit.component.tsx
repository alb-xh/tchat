import React from 'react';

import { EventManager } from '../../../events/event-manager.js';
import { Button } from './button.component.js';

type Props = {
  em: EventManager,
  focused: boolean,
  onEnter: () => void,
};

export const Submit = (props: Props) => {
  return (
    <Button
      em={props.em}
      focused={props.focused}
      onEnter={props.onEnter}
      text='Submit'
      alignSelf='flex-end'
      flexDirection='row'
      focusColor='blueBright'
      paddingX={1}
      marginX={1}
      borderStyle='bold'
    />
  )
}