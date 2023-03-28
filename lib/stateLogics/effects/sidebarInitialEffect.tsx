import { atomSidebarInitialOpen } from '@states/layouts';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

export const SidebarInitialEffect = () => {
  const sidebarInitialHandler = useRecoilCallback(({ set }) => () => {
    set(atomSidebarInitialOpen, true);
  });

  useEffect(() => {
    sidebarInitialHandler();
  }, [sidebarInitialHandler]);

  return null;
};
