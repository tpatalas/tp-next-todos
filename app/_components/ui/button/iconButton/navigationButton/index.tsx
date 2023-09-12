'use client';

import { atomNavigationOpen } from '@/button/button.states';
import { PropsButtonWithTooltip } from '@/button/button.types';
import { ButtonWithTooltip } from '@/button/buttonWithTooltip';
import { useSetAtom } from 'jotai';

export const NavigationButton = ({ configs, children }: PropsButtonWithTooltip) => {
  const setNavigationOpen = useSetAtom(atomNavigationOpen);

  return (
    <ButtonWithTooltip
      configs={configs}
      onClick={() => setNavigationOpen((event) => !event)}
    >
      {children}
    </ButtonWithTooltip>
  );
};
