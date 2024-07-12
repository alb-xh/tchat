import React, { useState } from 'react';
import { Text, Box } from 'ink';
import { UnorderedList, Alert } from '@inkjs/ui';

import { EventManager } from '../../events/event-manager.js';
import { Submit } from '../components/buttons/submit.component.js';
import { TextInput } from '../components/inputs/text-input.component.js';
import { PasswordInput } from '../components/inputs/password-input.component.js';
import { useFocus } from '../hooks/use-focus.hook.js';

type Props = { em: EventManager, focused: boolean };

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
	const [ focus ] = useFocus({ em: props.em, disable: !props.focused, size: 4 });

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
		<Box flexDirection='column' display={props.focused ? 'flex' : 'none'}>
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
								<TextInput em={props.em} onChange={(vl) => { setUsername(vl); }} disable={focus !== 0} />
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
								<PasswordInput em={props.em} onChange={(vl) => { setPassword(vl); }} disable={focus !== 1} />
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
								<PasswordInput em={props.em} onChange={(vl) => { setRePassword(vl); }} disable={focus !== 2} />
							</Box>
						</Box>
					</UnorderedList.Item>
				</UnorderedList>
				<Box flexDirection='row' alignSelf='flex-end'>
					<Submit em={props.em} focused={focus === 3} onEnter={onEnter} />
				</Box>
        <Alert variant='warning'>Please store your password, it can't be reset!</Alert>
			</Box>
		</Box>
  );
}
