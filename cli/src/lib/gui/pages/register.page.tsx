import React from 'react';

import { EventManager } from '../../events/event-manager.js';
import { Form } from '../components/forms/form.component.js'
import { usernameInput, passwordInput, rePasswordInput } from '../constants.js';

type Props = { em: EventManager };

export const RegisterPage = (props: Props) => {
	return (
		<Form
			em={props.em}
			onSubmit={(vl) => { ''; }}
			inputs={[ usernameInput, passwordInput, rePasswordInput ]}
			warning={`Please store your password, it can't be reset!`}
		/>
	);
}
