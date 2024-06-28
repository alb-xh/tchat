import React from 'react';
import { Text, Box } from 'ink';
import { OrderedList, PasswordInput, TextInput } from '@inkjs/ui';

import { Help } from '../components/help.component.js';
import { EventManager } from '../../events/event-manager.js';
import { useFocus } from '../hooks/use-focus.hook.js';

type Props = { em: EventManager };


export const LoginPage = (props: Props) => {
	const focus = useFocus({ em: props.em, size: 2 });

  return (
		<Box flexDirection='column'>
			<Box paddingTop={2} paddingX={1} paddingBottom={1} borderStyle='double'>
				<OrderedList>
					<OrderedList.Item>
						<Box borderColor={focus === 0 ? 'blueBright' : ''} marginBottom={1} paddingLeft={1} marginTop={-1} flexDirection='row' borderStyle='round' width={50}>
							<Text>Username |</Text>
							<Box marginLeft={2}><TextInput isDisabled={focus !== 0} placeholder='' /></Box>
						</Box>
					</OrderedList.Item>
					<OrderedList.Item>
						<Box borderColor={focus === 1 ? 'blueBright' : ''} paddingLeft={1} marginTop={-1} flexDirection='row' borderStyle='round' width={50}>
							<Text>Password |</Text>
							<Box marginLeft={2}><PasswordInput isDisabled={focus !== 1} placeholder='' /></Box>
						</Box>
					</OrderedList.Item>
				</OrderedList>
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
