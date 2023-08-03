import { DivContainerWithRef } from '@/container/divContainerWithRef';
import { SmoothTransition } from '@/transition/smoothTransition';
import { SmoothTransitionWithDivRef } from '@/transition/smoothTransitionWithDivRef';
import { TRANSITION_TYPE } from '@/transition/transition.consts';
import { optionsTransition } from '@/transition/transition.utils';
import { DELAY } from '@constAssertions/ui';
import { sectionHeaderContents } from '../section.consts';
import { STYLE_BLUR_GRADIENT_B_MD } from '@data/stylePreset';
import { mergeClasses } from '@/_lib/utils/misc.utils';

export const SectionHeader = () => {
  const divContainer_id = 'sectionHeader';
  const transitionHandler = (transition: TRANSITION_TYPE, delay?: keyof typeof DELAY) => {
    return optionsTransition({ transition: transition ?? 'fadeIn', delay: delay });
  };
  const optionsPoleTransition = { type: TRANSITION_TYPE['scaleY'], delay: DELAY['150'] };

  return (
    <SmoothTransition>
      <DivContainerWithRef
        _id={divContainer_id}
        className='my-10 flex flex-col items-center justify-center'
      >
        <div className='my-5 flex flex-row items-center justify-center'>
          <div className={'text-sm font-semibold uppercase tracking-widest text-gray-500'}>
            <SmoothTransitionWithDivRef
              _id={divContainer_id}
              options={transitionHandler('fadeIn')}
            >
              {sectionHeaderContents.title}
            </SmoothTransitionWithDivRef>
          </div>
        </div>
        <SmoothTransitionWithDivRef
          _id={divContainer_id}
          options={optionsPoleTransition}
        >
          <div className='relative flex h-[15rem] max-h-60 flex-row items-center justify-center'>
            <div
              className={mergeClasses(STYLE_BLUR_GRADIENT_B_MD, 'absolute h-full w-3 will-change-transform')}
              data-testid='gradientPole-testid'
            />
            <div className='h-full w-1 rounded-full bg-gradient-to-b from-blue-600' />
          </div>
        </SmoothTransitionWithDivRef>
      </DivContainerWithRef>
      <div className='flex flex-col items-center justify-center px-5 text-center'>
        <SmoothTransitionWithDivRef
          _id={divContainer_id}
          options={transitionHandler('fadeIn', 300)}
        >
          <h1 className='my-5 h-full bg-slate-50 text-3xl font-bold tracking-normal text-slate-800 sm:text-5xl'>
            {sectionHeaderContents.subTitle}
          </h1>
        </SmoothTransitionWithDivRef>
        <SmoothTransitionWithDivRef
          _id={divContainer_id}
          options={transitionHandler('fadeIn', 500)}
        >
          <h2 className='max-w-2xl text-lg text-slate-600 sm:text-xl'>{sectionHeaderContents.content}</h2>
        </SmoothTransitionWithDivRef>
      </div>
    </SmoothTransition>
  );
};
