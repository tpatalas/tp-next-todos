import { PropsContentText } from '@components/section/section.types';
import { DELAY } from '@constAssertions/ui';
import { STYLE_BLUR_GRADIENT_R_ZR } from '@data/stylePreset';
import { classNames } from '@stateLogics/utils';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { optionsTransition } from '@ui/transitions/smoothTransition/smoothTransition.utils';

export const ContentText = ({ title, subTitle, content, scrollRef }: PropsContentText) => {
  const transitionHandler = (delay?: keyof typeof DELAY) => {
    return optionsTransition({ transition: 'fadeIn', duration: 1000, delay: delay, rate: 0.8 });
  };

  return (
    <div className='flex max-w-md flex-col items-center justify-center space-y-3 text-center font-bold md:items-start md:text-start md:leading-relaxed md:tracking-wide'>
      <div
        className='min-w-max max-w-full overflow-hidden'
        ref={scrollRef}
      >
        <SmoothTransition
          options={transitionHandler()}
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
        options={transitionHandler(500)}
        scrollRef={scrollRef}
      >
        <p className='text-lg text-slate-800/80 opacity-100 will-change-transform md:text-xl'>{subTitle}</p>
      </SmoothTransition>
      <SmoothTransition
        options={transitionHandler(700)}
        scrollRef={scrollRef}
      >
        <p className='text-base font-medium text-slate-800/80 opacity-100 will-change-transform'>{content}</p>
      </SmoothTransition>
    </div>
  );
};
