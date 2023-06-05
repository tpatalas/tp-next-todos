import { useNavigationOpen } from '@hooks/layouts';
import { TypesLayout } from '@layouts/layout.types';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import { selectorNavigationOpenOnMobile } from '@states/layouts';
import { Backdrop } from '@ui/backdrops/backdrop';
import { Fragment as FooterSidebarFragment, forwardRef } from 'react';
import { useRecoilValue } from 'recoil';

type Props = Pick<Types, 'children'> & Pick<TypesLayout, 'path'>;

export const FooterNavigation = forwardRef<HTMLDivElement, Props>(({ path, children }: Props, ref) => {
  const setNavigationOpen = useNavigationOpen();
  const isSidebarMobileOpen = useRecoilValue(selectorNavigationOpenOnMobile);
  const layoutHome = path === 'home';
  const layoutApp = path === 'app';

  return (
    <FooterSidebarFragment>
      <Backdrop
        options={{ isPortal: false }}
        show={isSidebarMobileOpen}
        onClick={() => setNavigationOpen()}
      />
      <div
        ref={ref}
        className={classNames(
          'fixed z-30 ml:z-auto',
          layoutApp &&
            'left-0 top-0 w-72 bg-slate-50 pl-2 pr-0 pt-3 md:top-[4.6rem] md:flex md:w-full md:max-w-[16.5rem] md:flex-col md:bg-transparent md:pl-2 md:pr-0 md:pt-0',
          layoutHome && 'top-[0rem] w-full',
        )}
      >
        {children}
      </div>
    </FooterSidebarFragment>
  );
});

FooterNavigation.displayName = 'FooterNavigation';
