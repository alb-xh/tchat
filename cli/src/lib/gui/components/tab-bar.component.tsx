import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';

import { EventManager } from '../../events/event-manager.js';
import { useKeyPress } from '../hooks/use-key-press.hook.js';

type Props = { em: EventManager, tabs: string[] };

export const TabBar = (props: Props) => {
	const [ selectedTab, setSelectedTab ] = useState(0);

	useKeyPress(props.em, (key) => {
		if (key.name === 'tab') {
			setSelectedTab((tab) => tab + 1 % props.tabs.length);
		};
	}, [ props.tabs ]);

	useEffect(() => {
		props.em.emit(EventManager.Events.TAB_CHANGE, { tab: selectedTab });
	}, [ selectedTab ]);

	return (
		<Box>
			<Box flexDirection='row' alignItems='center' paddingX={1} borderStyle='round' borderColor="purple">
				{
					props.tabs.map((tab, i) => (
						<Box alignSelf='center' alignItems='center' key={`${tab}_container`}>
							{ i > 0 && <Text key={`${tab}_separator`}>{" | "}</Text> }
							<Text
								key={`${tab}_text`}
								bold={true}
								color="black"
								backgroundColor={i === selectedTab ? 'green' : 'white'}
							>
								{_.capitalize(tab)}
							</Text>
						</Box>
					))
				}
			</Box>
		</Box>
	);
};
