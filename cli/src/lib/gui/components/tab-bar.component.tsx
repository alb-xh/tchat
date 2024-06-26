import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';

import { EventManager } from '../../events/event-manager.js';
import { markdown } from '../utils/markdown.util.js';

type Props = { em: EventManager, tabs: string[] };

export const TabBar = (props: Props) => {
	const [ selectedTab, setSelectedTab ] = useState(0);

	useEffect(() => {
		function listener (payload?: Record<string, unknown>): void {
			if (payload?.['key'] === 'tab') { return setSelectedTab((selectedTab + 1) % props.tabs.length); };
		}

		props.em.emit(EventManager.Events.TAB_CHANGE, { tab: selectedTab });
		props.em.on(EventManager.Events.KEYPRESS, listener);

		return () => {
			props.em.off(EventManager.Events.KEYPRESS, listener);
		};
	}, [ selectedTab ])

	return (
		<Box>
			<Box flexDirection='row' alignItems='center' paddingX={1}>
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
