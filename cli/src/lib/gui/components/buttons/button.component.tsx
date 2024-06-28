import React from 'react';
import { Box, Text } from 'ink';

import { EventManager } from '../../../events/event-manager.js';
import { useKeyPress } from '../../hooks/use-key-press.hook.js';

type Props = {
  em: EventManager,
  text: string,
  focused: boolean,
  onEnter: () => void,
  borderStyle?: string,
  flexDirection?: string,
  alignSelf?: string,
  focusColor?: string,
  paddingX?: number,
  marginX?: number,
}

export const Button = (props: Props) => {
  useKeyPress({ em: props.em, keys: [[ 'return', false ]]}, () => {
    if (props.focused) {
      props.onEnter();
    }
  }, [ props.focused, props.onEnter ]);

  const color = props.focused ? props.focusColor ?? 'blueBright' : '';

  return (
    <Box
      flexDirection={props.flexDirection as never ?? 'row'}
      alignSelf={props.alignSelf as never ?? 'flex-start'}
      borderColor={color}
      borderStyle={props.borderStyle as never ?? 'bold'}
      paddingX={props.paddingX ?? 1}
      marginX={props.marginX ?? 1}
    >
      <Text color={color}>{props.text}</Text>
    </Box>
  );
}