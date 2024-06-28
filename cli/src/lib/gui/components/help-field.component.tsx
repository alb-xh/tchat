import React from 'react';
import { Newline, Box } from 'ink';

import { EventManager } from '../../events/event-manager.js';
import { FullDivider } from './divider.component.js';
import { Table } from './table.component.js';

type Props = {
  em: EventManager,
  visible: boolean,
  hotkeys: [string, string][],
};

export const HelpField = (props: Props) => {
  return (
    props.visible && (
      <Box display={props.visible ? 'flex' : 'none'} flexDirection='column' alignItems='center'>
        <Newline />
        <FullDivider title='Help' />
        <Newline />
        <Table data={props.hotkeys.map(([ Key, Description ]) => ({ Key, Description }))} />
      </Box>
    )
  )
}