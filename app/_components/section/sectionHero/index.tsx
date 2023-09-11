import { DivContainerWithRef } from '@/container/divContainerWithRef';
import { SmoothTransition } from '@/transition/smoothTransition';
import Link from 'next/link';
import { SignInButton } from '@/button/signInButton';
import { SmoothTransitionWithDivRef } from '@/transition/smoothTransitionWithDivRef';
import { PATH_ROUTE } from '@/_lib/consts/assertion.consts';
import { STYLE_BLUR_GRADIENT_R_LG } from '@/_lib/consts/style.consts';
import { ImageWithRemotePlaceholder } from '@/_components/next/imageWithRemotePlaceholder';
import { sectionContents } from '../section.consts';
import { cx } from 'class-variance-authority';
import { configsTransition } from '@/transition/transition.configs';
import { SmoothTransitionWithDefaultConfigs } from '@/transition/smoothTransitionWithDefaultConfigs';
import { configsImageWithRemotePlaceholder } from '@/next/imageWithRemotePlaceholder/imageWithRemotePlaceholder.configs';
import { configsSignInButton } from '@/button/signInButton/signInButton.configs';

export const SectionHero = async () => {
  const divContainer_id = 'sectionHero';

  return (
    <div>
      <div className='relative isolate pt-10'>
        <div className='py-24 sm:py-32 lg:pb-40'>
          <DivContainerWithRef
            _id={divContainer_id}
            className='mx-auto max-w-7xl px-6 lg:px-8'
          >
            <SmoothTransition configs={configsTransition({ preset: 'translateDown' })}>
              <div className='mx-auto max-w-2xl text-center'>
                <div className='mb-2 text-4xl font-bold text-slate-800 will-change-transform sm:text-6xl'>
                  {sectionContents.hero.title}
                </div>
                <div className='text-4xl font-bold text-slate-800 will-change-transform sm:text-6xl'>
                  {sectionContents.hero.subTitle}
                </div>
              </div>
            </SmoothTransition>
            <SmoothTransition configs={configsTransition({ preset: 'translateDown', delay: '300' })}>
              <div className='mx-auto max-w-2xl text-center'>
                <p className='mt-6 text-xl leading-8 text-gray-600 will-change-transform'>
                  {sectionContents.hero.content}
                </p>
              </div>
            </SmoothTransition>
            <SmoothTransition configs={configsTransition({ preset: 'translateDown', delay: '700' })}>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <SignInButton configs={configsSignInButton({ preset: 'getStarted' })} />
                <Link
                  className='text-sm font-semibold leading-6 text-gray-900'
                  href={PATH_ROUTE['features']}
                >
                  Learn more <span aria-hidden='true'>→</span>
                </Link>
              </div>
            </SmoothTransition>
            <SmoothTransitionWithDefaultConfigs>
              <div className='flex justify-center'>
                <div className='relative mt-16 flow-root max-w-[60rem] sm:mt-24'>
                  <SmoothTransitionWithDivRef
                    _id={divContainer_id}
                    configs={configsTransition({ preset: 'fadeIn', delay: '300', rate: '4.0' })}
                  >
                    <div
                      className={cx(
                        'absolute h-full w-full rounded-xl will-change-transform',
                        STYLE_BLUR_GRADIENT_R_LG,
                      )}
                      data-testid='gradient-testid'
                    />
                  </SmoothTransitionWithDivRef>
                  <SmoothTransitionWithDivRef
                    _id={divContainer_id}
                    configs={configsTransition({ preset: 'scaleCenterSm', delay: '150', rate: '4.0' })}
                  >
                    <div className='mx-auto flex w-full max-w-[60rem] flex-row items-center justify-center rounded-xl border-none ring-0 lg:rounded-2xl'>
                      <ImageWithRemotePlaceholder configs={configsImageWithRemotePlaceholder({ preset: 'demo' })} />
                    </div>
                  </SmoothTransitionWithDivRef>
                </div>
              </div>
            </SmoothTransitionWithDefaultConfigs>
          </DivContainerWithRef>
        </div>
      </div>
    </div>
  );
};
