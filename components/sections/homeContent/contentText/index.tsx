import { DELAY, DURATION } from '@constAssertions/ui';
import { STYLE_BLUR_GRADIENT_R_ZR } from '@data/stylePreset';
import { classNames } from '@stateLogics/utils';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { TRANSITION_TYPE } from '@ui/transitions/smoothTransition/smoothTransition.types';
import { RefObject } from 'react';

type TypesContentText = 'title' | 'subTitle' | 'content';
type TypesPropsContentText = Record<TypesContentText, string> & {
  scrollRef: RefObject<HTMLDivElement>;
};

export const ContentText = ({ title, subTitle, content, scrollRef }: TypesPropsContentText) => {
  const titleOptions = {
    type: TRANSITION_TYPE['fadeIn'],
    enterDuration: DURATION['1000'],
    rate: 0.8,
  };

  return (
    <div className='flex max-w-md flex-col items-center justify-center space-y-3 text-center font-bold md:items-start md:text-start md:leading-relaxed md:tracking-wide'>
      <div
        className='min-w-max max-w-full overflow-hidden'
        ref={scrollRef}
      >
        <SmoothTransition
          options={titleOptions}
          scrollRef={scrollRef}
        >
          <p
            className={classNames(
              'w-full max-w-sm animate-typing whitespace-nowrap bg-clip-text text-2xl text-transparent will-change-transform md:text-3xl',
              STYLE_BLUR_GRADIENT_R_ZR,
            )}
          >
            {title}
          </p>
        </SmoothTransition>
      </div>
      <SmoothTransition
        options={{ ...titleOptions, delay: DELAY['500'] }}
        scrollRef={scrollRef}
      >
        <p className='text-lg text-slate-800/80 opacity-100 will-change-transform md:text-xl'>{subTitle}</p>
      </SmoothTransition>
      <SmoothTransition
        options={{ ...titleOptions, delay: DELAY['700'] }}
        scrollRef={scrollRef}
      >
        <p className='text-base font-medium text-slate-800/80 opacity-100 will-change-transform'>{content}</p>
      </SmoothTransition>
    </div>
  );
};
