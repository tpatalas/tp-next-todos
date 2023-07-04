import { atomLayoutNavigationOpen } from '@layout/layout.states';
import { atomDisableScroll } from '@states/misc';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export type PropsFooterStateEffect = {
  isSidebarOpen?: boolean;
  isScrollDisabled?: boolean;
};

export const MockFooterStateEffect = ({ isSidebarOpen, isScrollDisabled }: PropsFooterStateEffect) => {
  const setSideBarOpen = useSetRecoilState(atomLayoutNavigationOpen('app'));
  const setScrollBar = useSetRecoilState(atomDisableScroll);

  useEffect(() => {
    setSideBarOpen(isSidebarOpen ?? false);
    isScrollDisabled ? setScrollBar(isScrollDisabled) : null;
  }, [isScrollDisabled, isSidebarOpen, setScrollBar, setSideBarOpen]);

  return null;
};
