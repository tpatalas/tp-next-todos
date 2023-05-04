import { DELAY, DURATION } from '@constAssertions/ui';
import { STYLE_BLUR_GRADIENT_R_LG, STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { SignInButton } from '@layouts/layoutHeader/signInButton';
import { TypesOptionsButton } from '@lib/types/options';
import { classNames } from '@stateLogics/utils';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { TRANSITION_TYPE } from '@ui/transitions/smoothTransition/smoothTransition.types';
import { useRef } from 'react';

export const HomeStartToday = () => {
  const signInButtonOptions: TypesOptionsButton = {
    signInButtonName: 'Get started',
    className: STYLE_BUTTON_NORMAL_BLUE,
  };
  const translateOptions = {
    type: TRANSITION_TYPE['translateDown'],
    enterDuration: DURATION['1000'],
    rate: 0.7,
  };
  const divRef = useRef(null);

  return (
    <div className='w-screen'>
      <div className='py-18 relative isolate my-10 px-6 md:mt-12 md:py-24 lg:px-8'>
        <div
          className='absolute inset-x-0 top-0 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl'
          aria-hidden='true'
        >
          <SmoothTransition
            options={translateOptions}
            scrollRef={divRef}
          >
            <div
              className={classNames(
                'custom-clip-path aspect-[2500/600] w-[70rem] flex-none opacity-40 will-change-transform md:aspect-[1400/600]',
                STYLE_BLUR_GRADIENT_R_LG,
              )}
            />
          </SmoothTransition>
        </div>
        <div
          className='mx-auto max-w-2xl text-center'
          ref={divRef}
        >
          <SmoothTransition
            options={translateOptions}
            scrollRef={divRef}
          >
            <h2 className='text-3xl font-bold tracking-tight text-slate-800 will-change-transform sm:text-4xl'>
              Achieve More with Less.
              <br />
              Get started today.
            </h2>
          </SmoothTransition>
          <SmoothTransition
            options={{ ...translateOptions, delay: DELAY['300'] }}
            scrollRef={divRef}
          >
            <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600 will-change-transform'>
              Elevate your efficiency and unlock the key to accomplishing more with our productivity-boosting
              app.
            </p>
          </SmoothTransition>
          <SmoothTransition
            options={{ ...translateOptions, delay: DELAY['700'] }}
            scrollRef={divRef}
          >
            <div className='mt-10 flex items-center justify-center will-change-transform'>
              <SignInButton options={signInButtonOptions} />
            </div>
          </SmoothTransition>
        </div>
      </div>
    </div>
  );
};
