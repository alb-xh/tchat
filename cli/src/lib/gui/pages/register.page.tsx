import React, { useState } from 'react';
import { Text, Box } from 'ink';
import { UnorderedList, PasswordInput, TextInput, Alert } from '@inkjs/ui';

import { EventManager } from '../../events/event-manager.js';
import { Submit } from '../components/buttons/submit.component.js';
import { HelpButton } from '../components/buttons/help.button.component.js';
import { HelpField } from '../components/help-field.component.js';
import { useFocus } from '../hooks/use-focus.hook.js';
import { useToggle } from '../hooks/use-toggle.hook.js';

type Props = { em: EventManager };

const getBorderColor = (index: number) => (args: { focus: number, error?: string }): string => {
	if ((args.error ?? '').length > 0) { return 'redBright' };
	if (args.focus === index) { return 'blueBright' };
	return '';
} ;

export const RegisterPage = (props: Props) => {
	const [ username, setUsername ] = useState('');
	const [ usernameError, setUsernameError ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ passwordError, setPasswordError ] = useState('');
	const [ rePassword, setRePassword ] = useState('');
	const [ rePasswordError, setRePasswordError ] = useState('');
	const [ visible, toggle ] = useToggle(false);
	const [ focus ] = useFocus({ em: props.em, size: 5 });

	const onEnter = () => {
		if (username.length < 4) {
			setUsernameError('Username must be at least 4 characters long');
		}

		if (password.length < 6) {
			setPasswordError('Password must be at least 6 characters long')
		}

		if (password !== rePassword) {
			setRePasswordError('Passwords must match');
		}
	};

  return (
		<Box flexDirection='column'>
			<Box flexDirection='column' paddingTop={2} paddingX={1} paddingBottom={1} borderStyle='double'>
				<UnorderedList>
					<UnorderedList.Item>
						<Box
							borderColor={getBorderColor(0)({ focus, error: usernameError })}
							marginBottom={1}
							paddingLeft={1}
							marginTop={-1}
							flexDirection='row'
							borderStyle='round'
							width={50}
						>
							<Text>Username        |</Text>
							<Box marginLeft={2}>
								<TextInput onChange={(vl) => { setUsername(vl); }} isDisabled={focus !== 0} placeholder='' />
							</Box>
						</Box>
					</UnorderedList.Item>
					<UnorderedList.Item>
						<Box
							borderColor={getBorderColor(1)({ focus, error: passwordError })}
							marginBottom={1}
							paddingLeft={1}
							marginTop={-1}
							flexDirection='row'
							borderStyle='round'
							width={50}>
							<Text>Password        |</Text>
							<Box marginLeft={2}>
								<PasswordInput onChange={(vl) => { setPassword(vl); }} isDisabled={focus !== 1} placeholder='' />
							</Box>
						</Box>
					</UnorderedList.Item>
          <UnorderedList.Item>
						<Box
							borderColor={getBorderColor(2)({ focus, error: rePasswordError })}
							paddingLeft={1} marginTop={-1}
							flexDirection='row'
							borderStyle='round'
							width={50}>
							<Text>Repeat Password |</Text>
							<Box marginLeft={2}>
								<PasswordInput onChange={(vl) => { setRePassword(vl); }} isDisabled={focus !== 2} placeholder='' />
							</Box>
						</Box>
					</UnorderedList.Item>
				</UnorderedList>
				<Box flexDirection='row' alignSelf='flex-end'>
					<Submit em={props.em} focused={focus === 3} onEnter={onEnter} />
					<HelpButton em={props.em} focused={focus === 4} onEnter={toggle} />
				</Box>
        <Alert variant='warning'>Please store your password, it can't be reset!</Alert>
			</Box>
			<HelpField
				em={props.em}
				visible={visible}
				hotkeys={[[ 'TAB', 'Navigate between tabs' ], [ 'UP/DOWN', 'Navigate between fields' ]]}
			/>
		</Box>
  );
}
