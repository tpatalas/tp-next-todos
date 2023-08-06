'use client';

import { useAtomValue } from 'jotai';
import { atomDivRef } from '@/container/container.states';
import { SmoothTransition } from '../smoothTransition';
import { PropsSmoothTransitionWithDivRef } from '../smoothTransition/smoothTransition.types';

export const SmoothTransitionWithDivRef = ({
  children,
  configs,
  _id = null,
}: PropsSmoothTransitionWithDivRef) => {
  const divRef = useAtomValue(atomDivRef(_id));

  return (
    <SmoothTransition
      configs={configs}
      scrollRef={divRef}
    >
      {children}
    </SmoothTransition>
  );
};
