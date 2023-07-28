'use client';

import { useEffect, useRef } from 'react';
import { PropsDivContainer } from '../container.types';
import { useSetAtom } from 'jotai';
import { atomDivRef } from '../container.states';

export const DivContainerWithRef = ({ children, className }: PropsDivContainer) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const setDivRef = useSetAtom(atomDivRef);

  useEffect(() => {
    setDivRef(divRef);
    // set the state only the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={className}
      ref={divRef}
      data-testid='divContainer-testid'
    >
      {children}
    </div>
  );
};
