import React from 'react';

import { EventManager } from '../../events/event-manager.js';
import { Form } from '../components/forms/form.component.js'
import { passwordInput, usernameInput } from '../constants.js';

type Props = { em: EventManager };

export const LoginPage = (props: Props) => {
  return (
		<Form
			em={props.em}
			inputs={[ usernameInput, passwordInput ]}
			onSubmit={(form) => {
				props.em.emit(EventManager.Events.LOGIN, {
					username: form['username'],
					password: form['password'],
				});
			}}
		/>
	)
}
