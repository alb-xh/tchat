import React from 'react';
import { Text, Box } from 'ink';
import { OrderedList, TextInput } from '@inkjs/ui';

import { Help } from '../components/help.component.js';
import { EventManager } from '../../events/event-manager.js';

type Props = { em: EventManager };

export const LoginPage = (props: Props) => {
  return (
		<Box flexDirection='column'>
			<Box paddingTop={2} paddingX={1} paddingBottom={1} borderStyle='double'>
				<OrderedList>
					<OrderedList.Item>
						<Box marginBottom={1} paddingLeft={1} marginTop={-1} flexDirection='row' borderStyle='round' width={50}>
							<Text>Username |</Text>
							<TextInput isDisabled={true} placeholder='' />
						</Box>
					</OrderedList.Item>
					<OrderedList.Item>
						<Box paddingLeft={1} marginTop={-1} flexDirection='row' borderStyle='round' width={50}>
							<Text>Password |</Text>
							<TextInput isDisabled={true} placeholder='' />
						</Box>
					</OrderedList.Item>
				</OrderedList>
			</Box>
			<Help
				em={props.em}
				hotkeys={[
					[ '1', 'Focus on username field' ],
					[ '2', 'Focus on password field' ],
					[ 'CTRL + S', 'Submit' ],
				]}
			/>
		</Box>
  );
}
