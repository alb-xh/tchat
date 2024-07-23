import React, { useState, useEffect } from 'react';
import { Box } from 'ink';
import { Spinner } from '@inkjs/ui';
import _ from 'lodash';

import { EventManager } from '../../events/event-manager.js';
import { FullDivider } from '../components/divider.component.js';
import { Logo } from '../components/logo.component.js';
import { AuthLayout } from './auth.layout.js';
import { DashboardLayout } from './dashboard.layout.js';

type Props = { em: EventManager };

export const MainLayout = (props: Props) => {
  const [ loading, setLoading ] = useState(true);
  const [ token, setToken ] = useState('');
  const [ user, setUser ] = useState<any>(null);

  useEffect(() => {
    function listener (payload?: Record<string, unknown>) {
      if (payload?.['code'] === 200) {
        setUser(payload?.['payload'] as any);
      }

      setTimeout(() => { setLoading(false); }, 500);
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
        setToken(_.get(payload, 'payload.token', '') as string);
      }
    }

    props.em.on(EventManager.Events.LOGIN, listener);
    props.em.on(EventManager.Events.REGISTER, listener);

    return () => {
      props.em.off(EventManager.Events.LOGIN, listener);
      props.em.off(EventManager.Events.REGISTER, listener);
    }
  }, []);

  return (
    <Box flexDirection='column'>
      <FullDivider />
      <Logo />
      <FullDivider />
      { (loading && !user) && (<Box flexDirection='column' alignItems='center'><Spinner type='aesthetic' /></Box>)  }
      { (!loading && user) && (<DashboardLayout em={props.em} user={user} />) }
      { (!loading && !user) && <AuthLayout em={props.em} /> }
    </Box>
  );
}