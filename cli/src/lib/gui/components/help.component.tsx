import React, { useState, useEffect } from 'react';
import { Newline, Box } from 'ink';

import { EventManager } from '../../events/event-manager.js';
import { FullDivider } from './divider.component.js';
import { Table } from './table.component.js';

type Props = {
  em: EventManager,
  hotkeys: [string, string][],
};

export const Help = (props: Props) => {
  const [ visible, setVisible ] = useState(false);

	useEffect(() => {
		function listener (payload?: Record<string, unknown>): void {
			if (
        payload?.['key'] === 'backspace' ||
        (payload?.['key'] === '' && payload?.['ctrl'] === true)
      ) {
        return setVisible(!visible);
      };
		}

		props.em.on(EventManager.Events.KEYPRESS, listener);

		return () => {
			props.em.off(EventManager.Events.KEYPRESS, listener);
		};
	}, [ visible ]);

  return (
    <>
        <Newline />
        <FullDivider title='Help (CTRL + H)' />
        <Newline />
        <Box display={visible ? 'flex' : 'none'} flexDirection='column' alignItems='center'>
          <Table
            data={props.hotkeys.map(([ Key, Description ]) => ({ Key, Description }))}
          />
        </Box>
    </>
  );
}