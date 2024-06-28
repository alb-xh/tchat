import React, { useState, useEffect } from 'react';

import { EventManager } from '../../events/event-manager.js';

type Props = { em: EventManager, size: number };

export const useFocus = (props: Props) => {
	const [ focusIndex, setFocus ] = useState(0);

	useEffect(() => {
		function listener (payload?: Record<string, unknown>) {
			const key = payload?.['key'] ?? '' as string;

			if (key === 'up') { return setFocus(focusIndex - 1 < 0 ? 0 : focusIndex - 1); }
			if (key === 'down') { return setFocus(focusIndex + 1 >= props.size ? 0 : focusIndex + 1); }
		}

		props.em.on(EventManager.Events.KEYPRESS, listener);

		return () => {
			props.em.off(EventManager.Events.KEYPRESS, listener);
		};
	}, [ focusIndex ]);

	return focusIndex
}
