import { PATH_HOME, PATH_IMAGE_HOME } from '@constAssertions/data';
import { DELAY } from '@constAssertions/ui';
import { STYLE_BLUR_GRADIENT_R_LG, STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { SignInButton } from '@layout/layoutHeader/signInButton';
import { TypesOptionsButton } from '@lib/types/options';
import { classNames, cloudflareLoader } from '@stateLogics/utils';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { optionsTransition } from '@ui/transitions/smoothTransition/smoothTransition.utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export const HomeHero = () => {
  const signInButtonOptions: TypesOptionsButton = {
    signInButtonName: 'Get started',
    className: STYLE_BUTTON_NORMAL_BLUE,
  };
  const translateDownHandler = (delay?: keyof typeof DELAY) => {
    return optionsTransition({ transition: 'translateDown', duration: 1000, delay: delay });
  };
  const divRef = useRef(null);

  return (
    <>
      <div>
        <div className='relative isolate pt-10'>
          <div className='py-24 sm:py-32 lg:pb-40'>
            <div
              className='mx-auto max-w-7xl px-6 lg:px-8'
              ref={divRef}
            >
              <SmoothTransition options={translateDownHandler()}>
                <div className='mx-auto max-w-2xl text-center'>
                  <div className='mb-2 text-4xl font-bold text-slate-800 will-change-transform sm:text-6xl'>
                    Simplify your life
                  </div>
                  <div className='text-4xl font-bold text-slate-800 will-change-transform sm:text-6xl'>
                    Automate your tasks
                  </div>
                </div>
              </SmoothTransition>
              <SmoothTransition options={translateDownHandler(300)}>
                <div className='mx-auto max-w-2xl text-center'>
                  <p className='mt-6 text-xl leading-8 text-gray-600 will-change-transform'>
                    Focus on your work more and manage your to-dos less. Enhance your efficiency and improve
                    your productivity.
                  </p>
                </div>
              </SmoothTransition>
              <SmoothTransition options={translateDownHandler(700)}>
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
              <SmoothTransition>
                <div className='flex justify-center'>
                  <div className='relative mt-16 flow-root max-w-[60rem] sm:mt-24'>
                    <SmoothTransition
                      options={optionsTransition({
                        transition: 'fadeIn',
                        duration: 1000,
                        delay: 500,
                        rate: 3,
                      })}
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
                      options={optionsTransition({
                        transition: 'scaleCenterSm',
                        duration: 700,
                        delay: 300,
                        rate: 3,
                      })}
                      scrollRef={divRef}
                    >
                      <div className='mx-auto flex w-full max-w-[60rem] flex-row items-center justify-center rounded-xl border-none ring-0 lg:rounded-2xl'>
                        <Image
                          loader={cloudflareLoader}
                          width={961}
                          height={754}
                          className='h-auto w-auto rounded-2xl ring-2 ring-slate-300/20 drop-shadow-2xl will-change-transform'
                          src={PATH_IMAGE_HOME['demo']}
                          sizes='90vw'
                          alt='demo application image'
                          priority={true}
                        />
                      </div>
                    </SmoothTransition>
                  </div>
                </div>
              </SmoothTransition>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
