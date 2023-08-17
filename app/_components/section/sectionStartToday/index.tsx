import { DivContainerWithRef } from '@/container/divContainerWithRef';
import { STYLE_BLUR_GRADIENT_R_LG } from '@/_lib/consts/style.consts';
import { SmoothTransition } from '@/transition/smoothTransition';
import { SmoothTransitionWithDivRef } from '@/transition/smoothTransitionWithDivRef';
import { SignInButton } from '@/button/signInButton';
import { configsSignInButton } from '@/button/button.configs';
import { sectionContents } from '../section.consts';
import { cx } from 'class-variance-authority';
import { configsTransition } from '@/transition/transition.configs';

export const SectionStartToday = () => {
  const divContainer_id = 'sectionStartToday';

  return (
    <SmoothTransition>
      <div className='py-18 relative isolate my-10 px-6 md:mt-12 md:py-24 lg:px-8'>
        <div
          className='absolute inset-x-0 top-0 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl'
          aria-hidden='true'
        >
          <SmoothTransition configs={configsTransition({ preset: 'translateDown' })}>
            <div
              className={cx(
                'custom-clip-path aspect-[2500/600] w-[70rem] flex-none opacity-40 will-change-transform md:aspect-[1400/600]',
                STYLE_BLUR_GRADIENT_R_LG,
              )}
              data-testid='gradient-testid'
            />
          </SmoothTransition>
        </div>
        <DivContainerWithRef
          _id={divContainer_id}
          className='mx-auto max-w-2xl text-center'
        >
          <SmoothTransitionWithDivRef
            _id={divContainer_id}
            configs={configsTransition({ preset: 'translateDown', rate: '0.75' })}
          >
            <h2 className='text-3xl font-bold tracking-tight text-slate-800 will-change-transform sm:text-4xl'>
              {sectionContents.startToday.title}
              <br />
              {sectionContents.startToday.subTitle}
            </h2>
          </SmoothTransitionWithDivRef>
          <SmoothTransitionWithDivRef
            _id={divContainer_id}
            configs={configsTransition({ preset: 'translateDown', delay: '300' })}
          >
            <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600 will-change-transform'>
              {sectionContents.startToday.content}
            </p>
          </SmoothTransitionWithDivRef>
          <SmoothTransitionWithDivRef
            _id={divContainer_id}
            configs={configsTransition({ preset: 'translateDown', delay: '700' })}
          >
            <div className='mt-10 flex items-center justify-center will-change-transform'>
              <SignInButton configs={configsSignInButton({ preset: 'getStarted' })} />
            </div>
          </SmoothTransitionWithDivRef>
        </DivContainerWithRef>
      </div>
    </SmoothTransition>
  );
};
