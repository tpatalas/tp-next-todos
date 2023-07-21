'use client';

import { useAtomValue } from 'jotai';
import { atomDivRef } from '@/container/container.states';
import { SmoothTransition } from '../smoothTransition';
import { PropsSmoothTransitionWithDivRef } from '../smoothTransition/smoothTransition.types';

export const SmoothTransitionWithDivRef = ({ children, options }: PropsSmoothTransitionWithDivRef) => {
  const divRef = useAtomValue(atomDivRef);

  return (
    <SmoothTransition
      options={options}
      scrollRef={divRef}
    >
      {children}
    </SmoothTransition>
  );
};
