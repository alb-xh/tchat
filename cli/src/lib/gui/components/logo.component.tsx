import React from 'react';
import process from 'node:process';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

import { Divider } from './divider.component.js';

export const Logo = () => {
  const name = 'TCHAT';
  const width = process.stdout.columns;


  return (
    <>
    <Divider width={width}/>
    <Gradient name='passion'>
      <BigText align='center' text={name}/>
    </Gradient>
    <Divider width={width}/>
    </>
  );
};