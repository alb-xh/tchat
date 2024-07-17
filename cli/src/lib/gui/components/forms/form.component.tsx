import React, { useState } from 'react';
import { Text, Box } from 'ink';
import { UnorderedList, Alert } from '@inkjs/ui';

import { EventManager } from '../../../events/event-manager.js';
import { Submit } from '../buttons/submit.component.js';
import { TextInput } from '../inputs/text-input.component.js';
import { PasswordInput } from '../inputs/password-input.component.js';
import { useFocus } from '../../hooks/use-focus.hook.js';

export type FormInputProps = { name: string, label: string, type: 'text' | 'password', validate: (form: Record<string, string>) => string }

export type FormProps = {
  warning?: string,
  inputs: FormInputProps[],
  onSubmit: (values: string[]) => void;
  em: EventManager,
};

export const Form = (props: FormProps) => {
	const [ values, setValues ] = useState(new Array(props.inputs.length).fill(''));
  const [ errors, setErrors ] = useState(new Array(props.inputs.length).fill(''));
	const [ focus ] = useFocus({ em: props.em, size: props.inputs.length + 1 });

  const getLabel = (label: string): string => `${label}${' '.repeat(label.length <= 16 ? 16 - label.length : 1)}|`;
  const getBorderColor = (idx: number): string => {
    if (errors[idx].length > 0) return 'redBright';
    if (focus === idx) return 'blueBright';
    return '';
  }

  const onChange = (newValue: string, idx: number) => {
    if (newValue !== values[idx]) {
      setValues(values.map((oldValue, i) => i === idx ? newValue : oldValue));
    }
  }

	const onEnter = () => {
    const form = props.inputs.reduce((obj, input, i) => {
      obj[input.name] = values[i];
      return obj;
    }, {} as Record<string, string>);

    const newErrors = props.inputs.map((input) => input.validate(form));
    setErrors(newErrors);

    if (newErrors.join('').length === 0) {
      props.onSubmit(values);
    }
	};

  return (
		<Box flexDirection='column'>
			<Box flexDirection='column' paddingTop={2} paddingX={1} paddingBottom={1} borderStyle='double'>
				<UnorderedList>
          {
            props.inputs.map((input, i) => {
              const inputProps = { em: props.em, onChange: (vl: string) => onChange(vl, i), disable: focus !== i };

              return (
                <UnorderedList.Item key={input.name}>
                  <Box borderColor={getBorderColor(i)} marginBottom={1} paddingLeft={1} marginTop={-1} flexDirection='row' borderStyle='round' width={50}>
                    <Text>{getLabel(input.label)}</Text>
                    <Box marginLeft={2}>
                      { input.type === 'password' ? <PasswordInput { ...inputProps } /> : <TextInput { ...inputProps } /> }
                    </Box>
                  </Box>
                </UnorderedList.Item>
              )
            })
          }
				</UnorderedList>
				<Box flexDirection='row' alignSelf='flex-end'>
					<Submit em={props.em} focused={focus === props.inputs.length} onEnter={onEnter} />
				</Box>
				<Box flexDirection='column' display={errors.join('').length > 0 ? 'flex' : 'none'}>
					<Alert variant='error'>{errors.filter(Boolean).join('\n\n')}</Alert>
				</Box>
        <Box flexDirection='column' display={props.warning ? 'flex' : 'none'}>
					<Alert variant='warning'>{props.warning}</Alert>
				</Box>
			</Box>
		</Box>
  );
}
