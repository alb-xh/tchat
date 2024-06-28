import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import { OrderedList, PasswordInput, TextInput, Alert } from '@inkjs/ui';

import { Help } from '../components/help.component.js';
import { EventManager } from '../../events/event-manager.js';
import { useFocus } from '../hooks/use-focus.hook.js';

type Props = { em: EventManager };

export const RegisterPage = (props: Props) => {
	const focus = useFocus({ em: props.em, size: 3 });

  return (
		<Box flexDirection='column'>
			<Box flexDirection='column' paddingTop={2} paddingX={1} paddingBottom={1} borderStyle='double'>
				<OrderedList>
					<OrderedList.Item>
						<Box borderColor={focus === 0 ? 'blueBright' : ''} marginBottom={1} paddingLeft={1} marginTop={-1} flexDirection='row' borderStyle='round' width={50}>
							<Text>Username        |</Text>
							<Box marginLeft={2}><TextInput isDisabled={focus !== 0} placeholder='' /></Box>
						</Box>
					</OrderedList.Item>
					<OrderedList.Item>
						<Box borderColor={focus === 1 ? 'blueBright' : ''} marginBottom={1} paddingLeft={1} marginTop={-1} flexDirection='row' borderStyle='round' width={50}>
							<Text>Password        |</Text>
							<Box marginLeft={2}><PasswordInput isDisabled={focus !== 1} placeholder='' /></Box>
						</Box>
					</OrderedList.Item>
          <OrderedList.Item>
						<Box borderColor={focus === 2 ? 'blueBright' : ''} paddingLeft={1} marginTop={-1} flexDirection='row' borderStyle='round' width={50}>
							<Text>Repeat Password |</Text>
							<Box marginLeft={2}><PasswordInput isDisabled={focus !== 2} placeholder='' /></Box>
						</Box>
					</OrderedList.Item>
				</OrderedList>
        <Alert variant='warning'>Please store your password, it can't be reset!</Alert>
			</Box>
			<Help
				em={props.em}
				hotkeys={[
          [ 'TAB', 'Navigate between tabs' ],
					[ 'UP/DOWN', 'Navigate between fields' ],
					[ 'CTRL + S', 'Submit' ],
				]}
			/>
		</Box>
  );
}
