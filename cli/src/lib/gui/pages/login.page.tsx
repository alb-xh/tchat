import React from 'react';
import { Text, Box } from 'ink';
import { UnorderedList } from '@inkjs/ui';

import { EventManager } from '../../events/event-manager.js';
import { useFocus } from '../hooks/use-focus.hook.js';
import { useToggle } from '../hooks/use-toggle.hook.js';
import { Submit } from '../components/buttons/submit.component.js';
import { HelpButton } from '../components/buttons/help.button.component.js'
import { HelpField } from '../components/help-field.component.js';
import { TextInput } from '../components/inputs/text-input.component.js';
import { PasswordInput } from '../components/inputs/password-input.component.js';

type Props = { em: EventManager };

export const LoginPage = (props: Props) => {
	const [ visible, toggle ] = useToggle(false);
	const [ focus ] = useFocus({ em: props.em, size: 4 });

  return (
		<Box flexDirection='column'>
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
					<HelpButton em={props.em} focused={focus === 3} onEnter={toggle} />
				</Box>
			</Box>
			<HelpField
				em={props.em}
				visible={visible}
				hotkeys={[[ 'TAB', 'Navigate between tabs' ], [ 'UP/DOWN', 'Navigate between fields' ]]}
			/>
		</Box>
  );
}
