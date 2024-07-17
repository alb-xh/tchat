import React from 'react';

import { EventManager } from '../../events/event-manager.js';
import { Form } from '../components/forms/form.component.js'
import { passwordInput, usernameInput } from '../constants.js';

type Props = { em: EventManager, focused: boolean };

export const LoginPage = (props: Props) => {
  return (
		<Form
			em={props.em}
			onSubmit={(vl) => { ''; }}
			inputs={[ usernameInput, passwordInput ]}
		/>
	)
}
