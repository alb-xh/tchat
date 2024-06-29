import React, { useState } from 'react';

import { EventManager } from '../../events/event-manager.js';
import { useKeyPress } from './use-key-press.hook.js';

type Props = { em: EventManager, size: number };

export const useFocus = (props: Props): [ number ] => {
	const [ focusIndex, setFocus ] = useState(0);

  useKeyPress(props.em, (key) => {
    if (key.name === 'up') { return setFocus(focusIndex - 1 < 0 ? props.size - 1 : focusIndex - 1); }
    if (key.name === 'down') { return setFocus(focusIndex + 1 >= props.size ? 0 : focusIndex + 1); }
  }, [ focusIndex, props.size ])

	return [ focusIndex ];
}
