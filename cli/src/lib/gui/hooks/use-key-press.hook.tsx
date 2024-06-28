import React, { useEffect } from 'react';

import { EventManager } from '../../events/event-manager.js';

type Props = {
  em: EventManager,
  keys?: [ string, boolean ][],
};

export const useKeyPress = (props: Props, cb: (key: string, ctrl: boolean) => void, deps?: unknown[]) => {
	useEffect(() => {
		function listener (payload?: Record<string, unknown>) {
			const key = (payload?.['key'] ?? '') as string;
      const ctrl = (payload?.['ctrl'] ?? false) as boolean;

      if (!props.keys) {
        cb(key, ctrl);
        return;
      }

      for (const [ k, c ] of props.keys) {
        if (k === key && c === ctrl) {
          cb(k, ctrl);
          return;
        }
      }
		}

		props.em.on(EventManager.Events.KEYPRESS, listener);

		return () => {
			props.em.off(EventManager.Events.KEYPRESS, listener);
		};
	}, [ props, ...(deps ?? []) ]);
}