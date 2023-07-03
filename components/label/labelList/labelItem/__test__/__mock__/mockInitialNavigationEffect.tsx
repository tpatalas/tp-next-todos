import { useInitialNavigation } from '@layout/layout.hooks';
import { useEffect } from 'react';

export const MockInitialNavigationEffect = ({ isBreakpointMd }: { isBreakpointMd: boolean }) => {
  const setInitial = useInitialNavigation({ path: 'app' });
  const mockValue = isBreakpointMd;

  useEffect(() => {
    !mockValue && setInitial();
  }, [mockValue, setInitial]);
  return null;
};
