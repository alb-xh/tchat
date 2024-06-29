import React, { useState, useEffect } from 'react'
import { Text } from 'ink';

import { EventManager } from '../../../events/event-manager.js';
import { useKeyPress } from '../../hooks/use-key-press.hook.js';

type Props = {
  em: EventManager,
  onChange?: (value: string) => void,
  defaultValue?: string,
  disable?: boolean,
  specialChar?: string,
}

export const TextInput = (props: Props) => {
  const [ value, setValue ] = useState(props.defaultValue ?? '');

  useKeyPress(props.em, (key) => {
    if (
      props?.disable
      || [ 'up', 'down', 'left', 'right', 'tab', 'return' ].includes(key.name)
      || (key.ctrl && key.name === 'c')
    ) {
      return;
    }

    if ([ 'backspace', 'delete' ].includes(key.name)) {
      setValue(value.slice(0, -1));
      return;
    }

    setValue(value + (key.sequence ?? key.name));
  }, [ props.disable, value, setValue ]);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(value);
    }
  }, [ value, props.onChange ]);

  return (<Text>{props.specialChar ? props.specialChar.repeat(value.length) : value}</Text>)
}