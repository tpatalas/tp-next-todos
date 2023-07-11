import { DELAY } from '@constAssertions/ui';
import { STYLE_BLUR_GRADIENT_R_LG, STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { SignInButton } from '@layout/layoutHeader/signInButton';
import { TypesOptionsButton } from '@lib/types/options';
import { classNames } from '@stateLogics/utils';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { optionsTransition } from '@ui/transitions/smoothTransition/smoothTransition.utils';
import { useRef } from 'react';
import { homeStartTodayText } from '../section.consts';

export const HomeStartToday = () => {
  const signInButtonOptions: TypesOptionsButton = {
    signInButtonName: 'Get started',
    className: STYLE_BUTTON_NORMAL_BLUE,
  };
  const transitionHandler = (delay?: keyof typeof DELAY) => {
    return optionsTransition({ transition: 'translateDown', duration: 1000, delay: delay, rate: 0.7 });
  };
  const divRef = useRef(null);

  return (
    <SmoothTransition>
      <div className='py-18 relative isolate my-10 px-6 md:mt-12 md:py-24 lg:px-8'>
        <div
          className='absolute inset-x-0 top-0 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl'
          aria-hidden='true'
        >
          <SmoothTransition
            options={transitionHandler()}
            scrollRef={divRef}
          >
            <div
              className={classNames(
                'custom-clip-path aspect-[2500/600] w-[70rem] flex-none opacity-40 will-change-transform md:aspect-[1400/600]',
                STYLE_BLUR_GRADIENT_R_LG,
              )}
              data-testid='gradient-testid'
            />
          </SmoothTransition>
        </div>
        <div
          className='mx-auto max-w-2xl text-center'
          ref={divRef}
        >
          <SmoothTransition
            options={transitionHandler()}
            scrollRef={divRef}
          >
            <h2 className='text-3xl font-bold tracking-tight text-slate-800 will-change-transform sm:text-4xl'>
              {homeStartTodayText.title}
              <br />
              {homeStartTodayText.subTitle}
            </h2>
          </SmoothTransition>
          <SmoothTransition
            options={transitionHandler(300)}
            scrollRef={divRef}
          >
            <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600 will-change-transform'>
              {homeStartTodayText.content}
            </p>
          </SmoothTransition>
          <SmoothTransition
            options={transitionHandler(700)}
            scrollRef={divRef}
          >
            <div className='mt-10 flex items-center justify-center will-change-transform'>
              <SignInButton options={signInButtonOptions} />
            </div>
          </SmoothTransition>
        </div>
      </div>
    </SmoothTransition>
  );
};
