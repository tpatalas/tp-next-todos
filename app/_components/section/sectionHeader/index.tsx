import { DivContainerWithRef } from '@/container/divContainerWithRef';
import { SmoothTransitionWithDivRef } from '@/transition/smoothTransitionWithDivRef';
import { STYLE_BLUR_GRADIENT_B_MD } from '@data/stylePreset';
import { sectionContents } from '../section.consts';
import { cx } from 'class-variance-authority';
import { configsTransition } from '@/transition/transition.configs';
import { SmoothTransitionWithDefaultConfigs } from '@/transition/smoothTransitionWithDefaultConfigs';

export const SectionHeader = () => {
  const divContainer_id = 'sectionHeader';

  return (
    <SmoothTransitionWithDefaultConfigs>
      <DivContainerWithRef
        _id={divContainer_id}
        className='my-10 flex flex-col items-center justify-center'
      >
        <div className='my-5 flex flex-row items-center justify-center'>
          <div className={'text-sm font-semibold uppercase tracking-widest text-gray-500'}>
            <SmoothTransitionWithDivRef
              _id={divContainer_id}
              configs={configsTransition()}
            >
              {sectionContents.headerContent.title}
            </SmoothTransitionWithDivRef>
          </div>
        </div>
        <SmoothTransitionWithDivRef
          _id={divContainer_id}
          configs={configsTransition({ type: 'scaleY', delay: '150' })}
        >
          <div className='relative flex h-[15rem] max-h-60 flex-row items-center justify-center'>
            <div
              className={cx(STYLE_BLUR_GRADIENT_B_MD, 'absolute h-full w-3 will-change-transform')}
              data-testid='gradientPole-testid'
            />
            <div className='h-full w-1 rounded-full bg-gradient-to-b from-blue-600' />
          </div>
        </SmoothTransitionWithDivRef>
      </DivContainerWithRef>
      <div className='flex flex-col items-center justify-center px-5 text-center'>
        <SmoothTransitionWithDivRef
          _id={divContainer_id}
          configs={configsTransition({ delay: '300' })}
        >
          <h1 className='my-5 h-full bg-slate-50 text-3xl font-bold tracking-normal text-slate-800 sm:text-5xl'>
            {sectionContents.headerContent.subTitle}
          </h1>
        </SmoothTransitionWithDivRef>
        <SmoothTransitionWithDivRef
          _id={divContainer_id}
          configs={configsTransition({ delay: '500' })}
        >
          <h2 className='max-w-2xl text-lg text-slate-600 sm:text-xl'>{sectionContents.headerContent.content}</h2>
        </SmoothTransitionWithDivRef>
      </div>
    </SmoothTransitionWithDefaultConfigs>
  );
};
