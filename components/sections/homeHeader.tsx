import { STYLE_BLUR_GRADIENT_B_MD } from '@data/stylePreset';
import { classNames } from '@stateLogics/utils';

export const HomeHeader = () => {
  return (
    <>
      <div className='my-10 flex flex-col items-center justify-center'>
        <div className='my-5 flex flex-row items-center justify-center'>
          <div className={'text-sm font-semibold uppercase tracking-widest text-gray-500'}>
            Simplify your works
          </div>
        </div>
        <div className='relative flex h-[12rem] max-h-60 flex-row items-center justify-center'>
          <div className={classNames(STYLE_BLUR_GRADIENT_B_MD, 'absolute h-full w-3')} />
          <div className='h-full w-1 rounded-full bg-gradient-to-b from-blue-600' />
        </div>
        <div className='px-5 text-center'>
          <h1 className='my-5 h-full bg-slate-50 text-3xl font-bold tracking-normal text-slate-800 sm:text-5xl'>
            Manage less work better
          </h1>
          <h2 className='max-w-2xl text-lg text-slate-600 sm:text-xl'>
            Unburden yourself from managing time-consuming tasks by allowing app to seamlessly
            choose the most suitable to-dos for you.
          </h2>
        </div>
      </div>
    </>
  );
};
