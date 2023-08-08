import { DivContainerWithRef } from '@/container/divContainerWithRef';
import { STYLE_BLUR_GRADIENT_R_ZR } from '@/_lib/consts/style.consts';
import { PropsSectionContentText } from '@/section/section.types';
import { SmoothTransitionWithDivRef } from '@/transition/smoothTransitionWithDivRef';
import { DELAY } from '@/transition/transition.consts';
import { configsTransition } from '@/transition/transition.utils';
import { cx } from 'class-variance-authority';

export const SectionContentText = ({ title, subTitle, content, _id = null }: PropsSectionContentText) => {
  const transitionHandler = (delay?: keyof typeof DELAY) => {
    return configsTransition({ transition: 'fadeIn', duration: 1000, delay: delay, rate: 0.8 });
  };

  return (
    <div className='flex max-w-md flex-col items-center justify-center space-y-3 text-center font-bold md:items-start md:text-start md:leading-relaxed md:tracking-wide'>
      <DivContainerWithRef
        _id={_id}
        className='min-w-max max-w-full overflow-hidden'
      >
        <SmoothTransitionWithDivRef
          _id={_id}
          configs={transitionHandler()}
        >
          <p
            className={cx(
              'w-full max-w-sm animate-typing whitespace-nowrap bg-clip-text text-2xl text-transparent will-change-transform md:text-3xl',
              STYLE_BLUR_GRADIENT_R_ZR,
            )}
          >
            {title}
          </p>
        </SmoothTransitionWithDivRef>
      </DivContainerWithRef>
      <SmoothTransitionWithDivRef
        _id={_id}
        configs={transitionHandler(500)}
      >
        <p className='text-lg text-slate-800/80 opacity-100 will-change-transform md:text-xl'>{subTitle}</p>
      </SmoothTransitionWithDivRef>
      <SmoothTransitionWithDivRef
        _id={_id}
        configs={transitionHandler(700)}
      >
        <p className='text-base font-medium text-slate-800/80 opacity-100 will-change-transform'>{content}</p>
      </SmoothTransitionWithDivRef>
    </div>
  );
};
