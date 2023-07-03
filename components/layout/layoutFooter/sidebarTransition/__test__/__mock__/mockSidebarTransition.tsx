import { BREAKPOINT } from '@constAssertions/ui';
import { atomLayoutNavigationOpen } from '@layout/layout.states';
import { TypesLayout } from '@layout/layout.types';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export type PropsSidebarTransition = Pick<TypesLayout, 'path'> & {
  isSidebarOpen?: boolean;
  isBreakpoint?: boolean;
};

export const MockSidebarTransition = ({ isSidebarOpen, isBreakpoint, path }: PropsSidebarTransition) => {
  const setSidebarOpen = useSetRecoilState(atomLayoutNavigationOpen(path));
  const setBreakpoint = useSetRecoilState(atomEffectMediaQuery(BREAKPOINT['md']));

  useEffect(() => {
    setSidebarOpen(isSidebarOpen ?? false);
    setBreakpoint(isBreakpoint ?? false);
  });
  return null;
};
