import React from 'react';
import { Text } from 'ink';

import { EventManager } from '../../events/event-manager.js';

type Props = { em: EventManager, user: { username: string } };

export const DashboardLayout = (props: Props) => {
  return (<Text>{`Hey ${props.user.username}`}</Text>);
}
