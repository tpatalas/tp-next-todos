import { GRADIENT_TYPE, GRADIENT_POSITION } from '@constAssertions/ui';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import { selectorNavigationOpen } from '@states/layouts';
import { atomDisableScroll } from '@states/misc';
import { GlobalVerticalGradient } from '@ui/gradients/globalVerticalGradient';
import { useRecoilValue } from 'recoil';

type Props = Pick<Types, 'children'>;

export const FooterBody = ({ children }: Props) => {
  const isSidebarOpen = useRecoilValue(selectorNavigationOpen);
  const isScrollDisabled = useRecoilValue(atomDisableScroll);

  return (
    <div
      className={classNames(
        'relative flex w-full flex-row justify-between rounded-xl bg-transparent transition-all duration-200 ease-in-out sm:mr-3 sm:mb-3 sm:shadow-lg sm:shadow-slate-300',
        isSidebarOpen ? 'md:ml-[266px]' : 'md:ml-3',
      )}>
      <GlobalVerticalGradient
        options={{ gradientType: GRADIENT_TYPE['single'], gradientPosition: GRADIENT_POSITION['top'] }}
      />
      <main
        className={classNames(
          'absolute mb-10 h-full w-full rounded-xl border border-slate-100',
          isScrollDisabled ? 'overflow-y-hidden' : 'overflow-y-auto',
        )}>
        <div className='flex w-full justify-center pt-4 pb-64 sm:pt-10 sm:pr-4 sm:pl-5 lg:justify-center lg:pl-10'>
          {children}
        </div>
      </main>
      <GlobalVerticalGradient
        options={{ gradientType: GRADIENT_TYPE['double'], gradientPosition: GRADIENT_POSITION['bottom'] }}
      />
    </div>
  );
};