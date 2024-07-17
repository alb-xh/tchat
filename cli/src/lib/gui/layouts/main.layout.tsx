import React, { useState, useEffect } from 'react';
import { Box } from 'ink';

import { EventManager } from '../../events/event-manager.js';
import { FullDivider } from '../components/divider.component.js';
import { Logo } from '../components/logo.component.js';
import { TabBar } from '../components/tab-bar.component.js';
import { LoginPage } from '../pages/login.page.js';
import { RegisterPage } from '../pages/register.page.js';

type PageProps = { em: EventManager, tab: number };
type Props = { em: EventManager };

const Page = (props: PageProps) => {
  switch (props.tab) {
    case 0: { return <LoginPage em={props.em} /> };
    case 1: { return <RegisterPage em={props.em} /> };
    default: { return ''; }
  }
}

export const MainLayout = (props: Props) => {
  const [ tabIndex, setTabIndex ] = useState(0);

  useEffect(() => {
    function listener (payload?: Record<string, unknown>) {
      const tabIndex = Number(payload?.['tab']);

      if (!Number.isNaN(tabIndex)) {
        setTabIndex(tabIndex);
      }
    }

    props.em.on(EventManager.Events.TAB_CHANGE, listener);

    return () => {
      props.em.off(EventManager.Events.TAB_CHANGE, listener);
    }
  }, [ tabIndex ]);

  return (
    <Box flexDirection='column'>
      <FullDivider />
      <Logo />
      <FullDivider />
      <TabBar em={props.em} tabs={[ 'Login', 'Register' ]} />
      <Page em={props.em} tab={tabIndex} />
    </Box>
  )
}
