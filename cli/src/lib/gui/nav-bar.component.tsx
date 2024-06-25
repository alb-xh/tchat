import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';

import { EventManager } from '../events/event-manager.js';

type Props = { em: EventManager, tabs: string[] };

export const NavBar = (props: Props) => {
	const [ selectedTab, setSelectedTab ] = useState(0);
	const [ focusTab, setFocusTab ] = useState(0);

	useEffect(() => {
		function listener (payload?: Record<string, unknown>): void {
			if (payload?.['key'] === 'tab') { return setFocusTab((focusTab + 1) % props.tabs.length)};
			if (payload?.['key'] === 'return') { return setSelectedTab(focusTab); };
		}

		props.em.on(EventManager.Events.KEYPRESS, listener);

		return () => {
			props.em.off(EventManager.Events.KEYPRESS, listener);
		};
	}, [ focusTab ])

	useEffect(() => {
		props.em.emit(EventManager.Events.TAB_CHANGE, { tab: selectedTab });
	}, [ selectedTab ])

	const getTabBgColor = (i: number): string => {
		if (i === selectedTab) { return 'greenBright'; }
		if (i === focusTab) { return 'yellowBright'; }
		return 'white';
	}

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
								backgroundColor={getTabBgColor(i)}
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
