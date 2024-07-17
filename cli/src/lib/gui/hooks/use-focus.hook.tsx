import React, { useState } from 'react';

import { EventManager } from '../../events/event-manager.js';
import { useKeyPress } from './use-key-press.hook.js';

type Props = { em: EventManager, size: number };

export const useFocus = (props: Props): [ number ] => {
	const [ focusIndex, setFocus ] = useState(0);

  useKeyPress(props.em, (key) => {
    if (key.name === 'up') { return setFocus((i) => i - 1 < 0 ? props.size - 1 : i - 1); }
    if (key.name === 'down') { return setFocus((i) => i + 1 >= props.size ? 0 : i + 1); }
  }, [ props.size ])

	return [ focusIndex ];
}
