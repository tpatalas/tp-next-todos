import { PATH_HOME, PATH_IMAGE_HOME } from '@constAssertions/data';
import { DELAY, DURATION } from '@constAssertions/ui';
import { STYLE_BLUR_GRADIENT_R_LG, STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { SignInButton } from '@layouts/layoutHeader/signInButton';
import { TypesOptionsButton } from '@lib/types/options';
import { classNames, nextImageLoader } from '@stateLogics/utils';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { TRANSITION_TYPE } from '@ui/transitions/smoothTransition/smoothTransition.types';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export const HomeHero = () => {
  const signInButtonOptions: TypesOptionsButton = {
    signInButtonName: 'Get started',
    className: STYLE_BUTTON_NORMAL_BLUE,
  };
  const translateOptions = { type: TRANSITION_TYPE['translateDown'], enterDuration: DURATION['1000'] };
  const scaleCenterOptions = {
    type: TRANSITION_TYPE['scaleCenterSm'],
    enterDuration: DURATION['1000'],
    rate: 2,
  };
  const fadeInOptions = {
    type: TRANSITION_TYPE['fadeIn'],
    enterDuration: DURATION['1000'],
    rate: 2,
    delay: DELAY['500'],
  };

  const divRef = useRef(null);

  return (
    <>
      <section className='w-screen'>
        <div className='relative isolate pt-10'>
          <div className='py-24 sm:py-32 lg:pb-40'>
            <div
              className='mx-auto max-w-7xl px-6 lg:px-8'
              ref={divRef}
            >
              <SmoothTransition options={translateOptions}>
                <div className='mx-auto max-w-2xl text-center'>
                  <h1 className='mb-2 text-4xl font-bold text-slate-800 will-change-transform sm:text-6xl'>
                    Simplify your life
                  </h1>
                  <h1 className='text-4xl font-bold text-slate-800 will-change-transform sm:text-6xl'>
                    Automate your tasks
                  </h1>
                </div>
              </SmoothTransition>
              <SmoothTransition options={{ ...translateOptions, delay: DELAY['300'] }}>
                <div className='mx-auto max-w-2xl text-center'>
                  <p className='mt-6 text-xl leading-8 text-gray-600 will-change-transform'>
                    Focus on your work more and manage your to-dos less. Enhance your efficiency and improve
                    your productivity.
                  </p>
                </div>
              </SmoothTransition>
              <SmoothTransition options={{ ...translateOptions, delay: DELAY['700'] }}>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                  <SignInButton options={signInButtonOptions} />
                  <Link
                    className='text-sm font-semibold leading-6 text-gray-900'
                    href={PATH_HOME['features']}
                  >
                    Learn more <span aria-hidden='true'>→</span>
                  </Link>
                </div>
              </SmoothTransition>
              <div className='flex justify-center'>
                <div className='relative mt-16 flow-root max-w-[60rem] sm:mt-24'>
                  <SmoothTransition
                    options={fadeInOptions}
                    scrollRef={divRef}
                  >
                    <div
                      className={classNames(
                        'absolute h-full w-full rounded-xl will-change-transform',
                        STYLE_BLUR_GRADIENT_R_LG,
                      )}
                    />
                  </SmoothTransition>
                  <SmoothTransition
                    options={scaleCenterOptions}
                    scrollRef={divRef}
                  >
                    <div className='mx-auto flex w-full max-w-[60rem] flex-row items-center justify-center rounded-xl border-none ring-0 lg:rounded-2xl'>
                      <Image
                        loader={nextImageLoader}
                        width={0}
                        height={0}
                        className='h-auto w-auto rounded-2xl ring-2 ring-slate-300/20 drop-shadow-2xl will-change-transform'
                        src={PATH_IMAGE_HOME['demo']}
                        alt='demo application image'
                        priority
                      />
                    </div>
                  </SmoothTransition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
