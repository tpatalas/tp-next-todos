import { PATH_IMAGE_HOME } from '@constAssertions/data';
import { classNames, nextImageLoader } from '@stateLogics/utils';
import Image from 'next/image';

export const HomeContent = () => {
  const styleImageWrapper =
    'w-80 rounded-xl shadow-2xl shadow-slate-500/30 ring-2 ring-slate-300/10';
  const styleImage = 'h-auto w-auto rounded-xl drop-shadow-2xl';

  return (
    <div className='my-32 px-28 py-10'>
      <div className='grid grid-cols-2 items-center justify-items-center gap-10'>
        <div>
          <div className='flex max-w-md flex-col items-start justify-center space-y-3 font-bold leading-relaxed tracking-wide'>
            <p className='text-3xl text-slate-800'>Spotlight your to-dos</p>
            <p className='text-xl text-slate-800/80'>
              View your to-dos that are intelligently and automatically selected in Today&apos;s
              Focus.
            </p>
            <p className='text-base font-medium text-slate-800/60'>
              Add your to-dos as you please, with or without due dates and priorities. Today&apos;s
              Focus will display your most important to-dos for you.
            </p>
          </div>
        </div>
        <div className={classNames(styleImageWrapper)}>
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
        <div className={classNames(styleImageWrapper)}>
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
        <div className='flex max-w-md flex-col items-start justify-center space-y-3 font-bold leading-relaxed tracking-wide'>
          <p className='text-3xl text-slate-800'>Free your overload</p>
          <p className='text-xl text-slate-800/80'>
            Work on a to-do list that is auto-allocated according to your capacity.
          </p>
          <p className='text-base font-medium text-slate-800/60'>
            Today&apos;s Focus efficiently determines the ideal number of to-dos for you. As you
            consistently complete to-dos, the process adjusts and assigns more or fewer to-dos base
            on your completion rate.
          </p>
          <p className='text-sm font-medium italic tracking-tight text-slate-800/40'>
            (Note. the current minimum number allocation is set to 7)
          </p>
        </div>
      </div>
    </div>
  );
};