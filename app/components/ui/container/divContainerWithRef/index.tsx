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
  }, [setDivRef]);

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
