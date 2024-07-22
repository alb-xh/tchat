import React, { useEffect } from 'react';

import { EventManager } from '../../events/event-manager.js';
import { Form } from '../components/forms/form.component.js'
import { usernameInput, passwordInput, rePasswordInput } from '../constants.js';

type Props = { em: EventManager };

export const RegisterPage = (props: Props) => {
	return (
		<Form
			inputs={[ usernameInput, passwordInput, rePasswordInput ]}
			warning={`Please store your password, it can't be reset!`}
			em={props.em}
			onSubmit={(form) => {
				props.em.emit(EventManager.Events.REGISTER, {
					username: form['username'],
					password: form['password'],
				});
			}}
		/>
	);
}
