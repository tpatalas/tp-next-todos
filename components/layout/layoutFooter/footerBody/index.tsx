import { GRADIENT_POSITION, GRADIENT_TYPE } from '@constAssertions/ui';
import { atomLayoutType, atomLayoutNavigationOpen } from '@layout/layout.states';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import { atomDisableScroll } from '@states/misc';
import { GlobalVerticalGradient } from '@ui/gradients/globalVerticalGradient';
import { useRecoilValue } from 'recoil';

type Props = Pick<Types, 'children'>;

export const FooterBody = ({ children }: Props) => {
  const layoutType = useRecoilValue(atomLayoutType);
  const isSidebarOpen = useRecoilValue(atomLayoutNavigationOpen(layoutType));
  const isScrollDisabled = useRecoilValue(atomDisableScroll);

  return (
    <div
      className={classNames(
        'relative flex w-full flex-row justify-between rounded-xl bg-transparent duration-150 ease-in-out sm:mb-3 sm:mr-3 sm:shadow-lg sm:shadow-slate-300',
        isSidebarOpen ? 'md:ml-[266px]' : 'md:ml-3',
      )}
    >
      <GlobalVerticalGradient
        options={{
          gradientType: GRADIENT_TYPE['single'],
          gradientPosition: GRADIENT_POSITION['top'],
        }}
      />
      <div
        className={classNames(
          'absolute mb-10 h-full w-full rounded-xl border border-slate-100',
          isScrollDisabled ? 'overflow-y-hidden' : 'overflow-y-auto',
        )}
      >
        <div className='flex w-full justify-center pb-64 pt-4 sm:pl-5 sm:pr-4 sm:pt-10 lg:justify-center lg:pl-10'>
          {children}
        </div>
      </div>
      <GlobalVerticalGradient
        options={{
          gradientType: GRADIENT_TYPE['double'],
          gradientPosition: GRADIENT_POSITION['bottom'],
        }}
      />
    </div>
  );
};
