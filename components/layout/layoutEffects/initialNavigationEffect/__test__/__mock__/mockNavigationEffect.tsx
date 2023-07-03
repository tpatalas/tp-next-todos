import { BREAKPOINT } from '@constAssertions/ui';
import { atomLayoutNavigationOpen } from '@layout/layout.states';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';

export const MockNavigationEffect = ({ isBreakpoint }: { isBreakpoint: boolean }) => {
  const setBreakpoint = useSetRecoilState(atomEffectMediaQuery(BREAKPOINT['md']));
  const appNavigation = useRecoilValue(atomLayoutNavigationOpen('app'));
  const homeNavigation = useRecoilValue(atomLayoutNavigationOpen('home'));

  useEffect(() => {
    setBreakpoint(isBreakpoint ?? false);
  }, [isBreakpoint, setBreakpoint]);

  return (
    <>
      {appNavigation ? 'appNavigationOpen' : null}
      {homeNavigation ? 'homeNavigationOpen' : null}
    </>
  );
};
