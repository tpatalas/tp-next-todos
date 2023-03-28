import { useSidebarOpen } from '@hooks/layouts';
import { Types } from '@lib/types';
import { atomSidebarOpenMobile } from '@states/layouts';
import { Backdrop } from '@ui/backdrops/backdrop';
import { Fragment as FooterSidebarFragment, forwardRef } from 'react';
import { useRecoilCallback } from 'recoil';

type Props = Pick<Types, 'children'>;

export const FooterSidebar = forwardRef<HTMLDivElement, Props>(({ children }: Props, ref) => {
  const setSidebarOpen = useSidebarOpen();
  const isSidebarMobileOpen = useRecoilCallback(({ snapshot }) => () => {
    return snapshot.getLoadable(atomSidebarOpenMobile).getValue();
  });

  return (
    <FooterSidebarFragment>
      <Backdrop
        options={{ isPortal: false }}
        show={isSidebarMobileOpen()}
        onClick={() => setSidebarOpen()}
      />
      <div
        ref={ref}
        className='fixed left-0 top-0 z-30 w-72 bg-slate-50 pl-2 pr-0 pt-3 md:top-[4.6rem] md:z-auto md:flex md:w-full md:max-w-[16.5rem] md:flex-col md:bg-transparent md:pt-0 md:pl-2 md:pr-0'>
        {children}
      </div>
    </FooterSidebarFragment>
  );
});

FooterSidebar.displayName = 'FooterSidebar';
