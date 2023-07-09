import { DELAY } from '@constAssertions/ui';
import { STYLE_BLUR_GRADIENT_B_MD } from '@data/stylePreset';
import { classNames } from '@stateLogics/utils';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { TRANSITION_TYPE } from '@ui/transitions/smoothTransition/smoothTransition.types';
import { optionsTransition } from '@ui/transitions/smoothTransition/smoothTransition.utils';
import { useRef } from 'react';

export const HomeHeader = () => {
  const divRef = useRef(null);
  const poleOptions = { type: TRANSITION_TYPE['scaleY'], delay: DELAY['150'] };
  const transitionHandler = (transition: TRANSITION_TYPE, delay?: keyof typeof DELAY) => {
    return optionsTransition({ transition: transition ?? 'fadeIn', delay: delay });
  };

  return (
    <SmoothTransition>
      <div
        className='my-10 flex flex-col items-center justify-center'
        ref={divRef}
      >
        <div className='my-5 flex flex-row items-center justify-center'>
          <div className={'text-sm font-semibold uppercase tracking-widest text-gray-500'}>
            <SmoothTransition
              scrollRef={divRef}
              options={transitionHandler('fadeIn')}
            >
              Simplify your works
            </SmoothTransition>
          </div>
        </div>
        <SmoothTransition
          scrollRef={divRef}
          options={poleOptions}
        >
          <div className='relative flex h-[15rem] max-h-60 flex-row items-center justify-center'>
            <div
              className={classNames(STYLE_BLUR_GRADIENT_B_MD, 'absolute h-full w-3 will-change-transform')}
            />
            <div className='h-full w-1 rounded-full bg-gradient-to-b from-blue-600' />
          </div>
        </SmoothTransition>
      </div>
      <div className='flex flex-col items-center justify-center px-5 text-center'>
        <SmoothTransition
          scrollRef={divRef}
          options={transitionHandler('fadeIn', 300)}
        >
          <h1 className='my-5 h-full bg-slate-50 text-3xl font-bold tracking-normal text-slate-800 sm:text-5xl'>
            Manage less work better
          </h1>
        </SmoothTransition>
        <SmoothTransition
          scrollRef={divRef}
          options={transitionHandler('fadeIn', 500)}
        >
          <h2 className='max-w-2xl text-lg text-slate-600 sm:text-xl'>
            Unburden yourself from managing time-consuming tasks by allowing app to seamlessly choose the most
            suitable to-dos for you.
          </h2>
        </SmoothTransition>
      </div>
    </SmoothTransition>
  );
};
