import { DivContainerWithRef } from '@/container/divContainerWithRef';
import { SmoothTransition } from '@/transition/smoothTransition';
import { configsTransition } from '@/transition/transition.utils';
import { DELAY } from '@constAssertions/ui';
import Link from 'next/link';
import { SignInButton } from '@/button/signInButton';
import { SmoothTransitionWithDivRef } from '@/transition/smoothTransitionWithDivRef';
import { PATH_HOME } from '@/_lib/consts/assertion.consts';
import { STYLE_BLUR_GRADIENT_R_LG } from '@/_lib/consts/style.consts';
import { mergeClasses } from '@/_lib/utils/misc.utils';
import { ImageWithRemotePlaceholder } from '@/_components/next/imageWithRemotePlaceholder';
import { configsSignInButton } from '@/button/button.configs';
import { optionsSectionHeroWithImage } from './sectionHero.consts';
import { sectionContents } from '../section.consts';

export const SectionHero = async () => {
  const divContainer_id = 'sectionHero';
  const translateDownHandler = (delay?: keyof typeof DELAY) => {
    return configsTransition({ transition: 'translateDown', duration: 1000, delay: delay });
  };
  const optionsFadeIn = configsTransition({
    transition: 'fadeIn',
    duration: 1000,
    delay: 300,
    rate: 4,
  });
  const optionsScaleCenterSm = configsTransition({
    transition: 'scaleCenterSm',
    duration: 700,
    delay: 150,
    rate: 4,
  });

  return (
    <div>
      <div className='relative isolate pt-10'>
        <div className='py-24 sm:py-32 lg:pb-40'>
          <DivContainerWithRef
            _id={divContainer_id}
            className='mx-auto max-w-7xl px-6 lg:px-8'
          >
            <SmoothTransition configs={translateDownHandler()}>
              <div className='mx-auto max-w-2xl text-center'>
                <div className='mb-2 text-4xl font-bold text-slate-800 will-change-transform sm:text-6xl'>
                  {sectionContents.hero.title}
                </div>
                <div className='text-4xl font-bold text-slate-800 will-change-transform sm:text-6xl'>
                  {sectionContents.hero.subTitle}
                </div>
              </div>
            </SmoothTransition>
            <SmoothTransition configs={translateDownHandler(300)}>
              <div className='mx-auto max-w-2xl text-center'>
                <p className='mt-6 text-xl leading-8 text-gray-600 will-change-transform'>
                  {sectionContents.hero.content}
                </p>
              </div>
            </SmoothTransition>
            <SmoothTransition configs={translateDownHandler(700)}>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <SignInButton configs={configsSignInButton['getStarted']} />
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
                  <SmoothTransitionWithDivRef
                    _id={divContainer_id}
                    configs={optionsFadeIn}
                  >
                    <div
                      className={mergeClasses(
                        'absolute h-full w-full rounded-xl will-change-transform',
                        STYLE_BLUR_GRADIENT_R_LG,
                      )}
                      data-testid='gradient-testid'
                    />
                  </SmoothTransitionWithDivRef>
                  <SmoothTransitionWithDivRef
                    _id={divContainer_id}
                    configs={optionsScaleCenterSm}
                  >
                    <div className='mx-auto flex w-full max-w-[60rem] flex-row items-center justify-center rounded-xl border-none ring-0 lg:rounded-2xl'>
                      <ImageWithRemotePlaceholder configs={optionsSectionHeroWithImage} />
                    </div>
                  </SmoothTransitionWithDivRef>
                </div>
              </div>
            </SmoothTransition>
          </DivContainerWithRef>
        </div>
      </div>
    </div>
  );
};
