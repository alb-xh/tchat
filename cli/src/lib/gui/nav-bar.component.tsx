import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import { Text, Box } from 'ink';
import { Injectable } from '@nestjs/common';

import { EventManager } from '../events/event-manager.js';

type Props = {
	em: EventManager,
	tabs: string[],
}

const NavBar = (props: Props) => {
	const [ selectedTab, setSelectedTab ] = useState(0);

	useEffect(() => {
		props.em.emit(EventManager.Events.TAB_CHANGE, { tab: selectedTab });
	}, [ selectedTab ])

	props.em.on(EventManager.Events.KEYPRESS, (payload?: Record<string, unknown>): void => {
		if (payload?.['key'] === 'TAB') {
			setSelectedTab(selectedTab + 1);
		}
	});

	return (
		<Box>
			{ props.tabs.map((tab) => <Text key={tab}>{_.capitalize(tab)}</Text>) }
		</Box>
	);
};

@Injectable()
export class NavBarComponent {
	constructor (private readonly eventManager: EventManager) {}

	render (tabs: string[]) {
		return <NavBar em={this.eventManager} tabs={tabs} />;
	}
};
