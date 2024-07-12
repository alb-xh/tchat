import React from 'react';
import { Text, Box } from 'ink';
import { UnorderedList } from '@inkjs/ui';

import { EventManager } from '../../events/event-manager.js';
import { useFocus } from '../hooks/use-focus.hook.js';
import { Submit } from '../components/buttons/submit.component.js';
import { TextInput } from '../components/inputs/text-input.component.js';
import { PasswordInput } from '../components/inputs/password-input.component.js';
import { passwordRegex, usernameRegex } from '../constants.js';

type Props = { em: EventManager, focused: boolean };

export const LoginPage = (props: Props) => {
	const [ focus ] = useFocus({ em: props.em, disable: !props.focused, size: 3 });

  return (
		<Box flexDirection='column' display={props.focused ? 'flex' : 'none'}>
			<Box flexDirection='column' paddingTop={2} paddingX={1} paddingBottom={1} borderStyle='double'>
				<UnorderedList>
					<UnorderedList.Item>
						<Box borderColor={focus === 0 ? 'blueBright' : ''} marginBottom={1} paddingLeft={1} marginTop={-1} flexDirection='row' borderStyle='round' width={50}>
							<Text>Username |</Text>
							<Box marginLeft={2}>
								<TextInput em={props.em} disable={focus !== 0} />
							</Box>
						</Box>
					</UnorderedList.Item>
					<UnorderedList.Item>
						<Box borderColor={focus === 1 ? 'blueBright' : ''} paddingLeft={1} marginTop={-1} flexDirection='row' borderStyle='round' width={50}>
							<Text>Password |</Text>
							<Box marginLeft={2} >
							<PasswordInput em={props.em} disable={focus !== 1} />
							</Box>
						</Box>
					</UnorderedList.Item>
				</UnorderedList>
				<Box flexDirection='row' alignSelf='flex-end'>
					<Submit em={props.em} focused={focus === 2} onEnter={() => {/* n/a */ }} />
				</Box>
			</Box>
		</Box>
  );
}
