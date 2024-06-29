import React, { useCallback, useState } from 'react';

export const useToggle = (defaultValue: boolean): [ boolean, () => void ] => {
  const [ visible, setVisible ] = useState(defaultValue);
  const toggle = useCallback(() => { setVisible((v) => !v); }, []);

  return [ visible, toggle ];
}

