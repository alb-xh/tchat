import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { Spinner } from '@inkjs/ui';

import { EventManager } from '../../events/event-manager.js';
import { FullDivider } from '../components/divider.component.js';
import { Logo } from '../components/logo.component.js';
import { TabBar } from '../components/tab-bar.component.js';
import { LoginPage } from '../pages/login.page.js';
import { RegisterPage } from '../pages/register.page.js';
import _ from 'lodash';
import { Debugger } from '../../components/debugger.component.js';

type PageProps = { em: EventManager, tab: number };
type Props = { em: EventManager };

export const Wrapper = (props: { children: React.ReactNode }) => {
  return (
    <Box flexDirection='column'>
      <FullDivider />
      <Logo />
      <FullDivider />
      {props.children}
    </Box>
  )
}

const Page = (props: PageProps) => {
  switch (props.tab) {
    case 0: { return <LoginPage em={props.em} /> };
    case 1: { return <RegisterPage em={props.em} /> };
    default: { return ''; }
  }
}
export const AuthLayout = (props: Props) => {
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
    <Wrapper>
      <TabBar em={props.em} tabs={[ 'Login', 'Register' ]} />
      <Page em={props.em} tab={tabIndex} />
    </Wrapper>
  );
}

const debug = new Debugger('MainLayout');

export const MainLayout = (props: Props) => {
  const [ loading, setLoading ] = useState(true);
  const [ token, setToken ] = useState('');
  const [ user, setUser ] = useState<any>(null);

  useEffect(() => {
    function listener (payload?: Record<string, unknown>) {
      if (payload?.['code'] === 200) {
        setUser(payload?.['payload'] as any);
      }

      setLoading(false);
    }

    props.em.on(EventManager.Events.ME, listener);
    props.em.emit(EventManager.Events.ME, { token });

    return () => {
      props.em.off(EventManager.Events.ME, listener);
    }
  }, [ token ]);

  useEffect(() => {
    function listener (payload?: Record<string, unknown>) {
      if (payload?.['code'] === 200) {
        debug.log('Token', payload);
        setToken(_.get(payload as any, 'payload.token', ''));
      }
    }

    props.em.on(EventManager.Events.REGISTER, listener);

    return () => {
      props.em.off(EventManager.Events.REGISTER, listener);
    }
  }, []);

  if (loading) {
    return <Wrapper><Spinner label="Loading" /></Wrapper>;
  }

  if (user) {
    return <Wrapper><Text>{`Hey ${user.username}`}</Text></Wrapper>
  }

  return (<AuthLayout em={props.em} />)
}