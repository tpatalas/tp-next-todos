import { STYLE_BLUR_GRADIENT_B_MD } from '@data/stylePreset';
import { Transition } from '@headlessui/react';
import { useVerticalScrollPositionTrigger } from '@hooks/ui';
import { classNames } from '@stateLogics/utils';
import { useRef } from 'react';

export const HomeHeader = () => {
  const devRef = useRef(null);
  const test = useVerticalScrollPositionTrigger(devRef);
  return (
    <>
      <div className='my-10 flex flex-col items-center justify-center'>
        <div className='my-5 flex flex-row items-center justify-center'>
          <div className={'text-sm font-semibold uppercase tracking-widest text-gray-500'}>
            Simplify your works
          </div>
        </div>
        <div ref={devRef}>
          <Transition
            appear={true}
            show={test}
            enter='transition ease-in-out duration-1000 transform- origin-top'
            enterFrom='scale-y-[0] opacity-0'
            enterTo='scale-y-[1] opacity-100'
            leave='transition ease-in-out duration-500'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'>
            <div className='relative flex h-[12rem] max-h-60 flex-row items-center justify-center'>
              <div
                className={classNames(
                  STYLE_BLUR_GRADIENT_B_MD,
                  'absolute h-full w-3 will-change-transform',
                )}
              />
              <div className='h-full w-1 rounded-full bg-gradient-to-b from-blue-600' />
            </div>
          </Transition>
        </div>
        <div className='px-5 text-center'>
          <h1 className='my-5 h-full bg-slate-50 text-3xl font-bold tracking-normal text-slate-800 sm:text-5xl'>
            Manage less work better
          </h1>
          <h2 className='max-w-2xl text-lg text-slate-600 sm:text-xl'>
            Unburden yourself from managing time-consuming tasks by allowing app to seamlessly
            choose the most suitable to-dos for you.
          </h2>
        </div>
      </div>
    </>
  );
};
