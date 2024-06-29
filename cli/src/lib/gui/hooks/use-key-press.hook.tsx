import React, { useEffect } from 'react';

import { EventManager } from '../../events/event-manager.js';

export type Key = {
  sequence?: string,
  name: string,
  ctrl: boolean,
  shift: boolean
}

export const useKeyPress = (em: EventManager, cb: (key: Key)  => void, deps?: unknown[]) => {
	useEffect(() => {
		function listener (payload?: Record<string, unknown>) {
      cb(payload as Key);
		}

		em.on(EventManager.Events.KEYPRESS, listener);

		return () => {
			em.off(EventManager.Events.KEYPRESS, listener);
		};
	}, [ em, ...(deps ?? []) ]);
}