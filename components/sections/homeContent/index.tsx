import { PATH_IMAGE_HOME } from '@constAssertions/data';
import { STYLE_BLUR_GRADIENT_R_ZR } from '@data/stylePreset';
import { classNames, nextImageLoader } from '@stateLogics/utils';
import Image from 'next/image';

export const HomeContent = () => {
  const styleImageWrapper =
    'relative w-80 rounded-xl shadow-2xl shadow-slate-500/30 ring-2 ring-slate-300/10';
  const styleImage = 'h-auto w-auto rounded-xl drop-shadow-2xl';

  return (
    <div className='relative my-24 flex flex-row items-center justify-center px-5 py-10 sm:px-10 md:my-32 lg:px-28'>
      <div className='grid grid-cols-1 items-center justify-items-center gap-10 md:grid-cols-2'>
        <div>
          <div className='flex max-w-md flex-col items-center justify-center space-y-3 text-center font-bold md:items-start md:text-start md:leading-relaxed md:tracking-wide'>
            <div className='min-w-max max-w-full overflow-hidden'>
              <p
                className={classNames(
                  'w-full max-w-sm whitespace-nowrap bg-clip-text text-2xl text-transparent md:text-3xl',
                  STYLE_BLUR_GRADIENT_R_ZR,
                )}>
                Spotlight your to-dos
              </p>
            </div>
            <p className='text-lg text-slate-800/80 opacity-100 md:text-xl'>
              View your to-dos that are intelligently and automatically selected in Today&apos;s
              Focus.
            </p>
            <p className='text-base font-medium text-slate-800/80 opacity-100'>
              Add your to-dos as you please, with or without due dates and priorities. Today&apos;s
              Focus will display your most important to-dos for you.
            </p>
          </div>
        </div>
        <div className={classNames(styleImageWrapper, 'opacity-100')}>
          <Image
            loader={nextImageLoader}
            width={0}
            height={0}
            className={styleImage}
            src={PATH_IMAGE_HOME['contentFocus']}
            alt='content focus image'
            priority
          />
        </div>
        <div className={classNames(styleImageWrapper, 'opacity-100 max-md:order-last')}>
          <Image
            loader={nextImageLoader}
            width={0}
            height={0}
            className={styleImage}
            src={PATH_IMAGE_HOME['contentOrganize']}
            alt='content organize image'
            priority
          />
        </div>
        <div className='flex max-w-md flex-col items-center justify-center space-y-3 text-center font-bold md:items-start md:text-start md:leading-relaxed md:tracking-wide'>
          <div className='min-w-max max-w-full overflow-hidden'>
            <p
              className={classNames(
                'w-full max-w-sm whitespace-nowrap bg-clip-text text-2xl text-transparent md:text-3xl',
                STYLE_BLUR_GRADIENT_R_ZR,
              )}>
              Free your overload
            </p>
          </div>
          <p className='text-lg text-slate-800/80 opacity-100 md:text-xl'>
            Work on a to-do list that is auto-allocated according to your capacity.
          </p>
          <p className='text-base font-medium text-slate-800/80 opacity-100'>
            Today&apos;s Focus efficiently determines the ideal number of to-dos for you. As you
            consistently complete to-dos, the process adjusts and assigns more or fewer to-dos base
            on your completion rate.
          </p>
          <p className='text-sm font-medium italic tracking-tight text-slate-800/70'>
            (Note. the current minimum number allocation is set to 7)
          </p>
        </div>
      </div>
    </div>
  );
};
