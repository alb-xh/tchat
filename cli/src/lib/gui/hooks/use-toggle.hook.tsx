import React, { useState } from 'react';

export const useToggle = (defaultValue: boolean): [ boolean, () => void ] => {
  const [ visible, setVisible ] = useState(defaultValue);
  const toggle = () => setVisible(!visible);

  return [ visible, toggle ];
}

