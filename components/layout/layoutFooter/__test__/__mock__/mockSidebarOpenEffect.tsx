import { atomLayoutNavigationOpen } from '@layout/layout.states';
import { TypesLayout } from '@layout/layout.types';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export type PropsSidebarOpenEffect = Pick<TypesLayout, 'path'> & { isSidebarOpen: boolean };

export const MockSidebarOpenEffect = ({ isSidebarOpen, path }: PropsSidebarOpenEffect) => {
  const setSidebarOpen = useSetRecoilState(atomLayoutNavigationOpen(path));

  useEffect(() => {
    setSidebarOpen(isSidebarOpen ?? false);
  }, [isSidebarOpen, setSidebarOpen]);

  return null;
};
