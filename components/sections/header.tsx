import { STYLE_BLUR_GRADIENT_B_MD } from '@data/stylePreset';
import { useVerticalScrollPosition } from '@hooks/misc';
import { classNames } from '@stateLogics/utils';

export const Header = () => {
  const scrollPosition = useVerticalScrollPosition();
  const scrollPositionRate = (startPosition: number, multiplier: number) =>
    scrollPosition < startPosition ? 0 : (scrollPosition / startPosition - 1) * multiplier;
  const headerHeightRate = (scrollPositionRate(900, 2) * 100) / 9;

  return (
    <>
      <div className='my-10 flex flex-col items-center justify-center'>
        <div className='my-5 flex flex-row items-center justify-center'>
          <div
            className={'text-sm font-semibold uppercase tracking-widest text-gray-500'}
            style={{ opacity: scrollPositionRate(900, 10) }}>
            Simplify your works
          </div>
        </div>
        <div
          className='relative flex max-h-[9rem] flex-row items-center justify-center'
          style={{ height: `${headerHeightRate}rem` }}>
          <div className={classNames(STYLE_BLUR_GRADIENT_B_MD, 'h-full w-3')} />
          <div className='h-full w-1 rounded-full bg-gradient-to-b from-blue-600' />
        </div>
        <div className='text-center'>
          <h1
            className='my-5 h-full bg-slate-50 text-4xl font-bold tracking-normal text-slate-800 sm:text-5xl'
            style={{
              opacity: scrollPositionRate(1280, 10),
            }}>
            Manage less work better
          </h1>
          <h2
            className='max-w-2xl text-xl text-slate-600'
            style={{
              opacity: scrollPositionRate(1350, 10),
            }}>
            Unburden yourself from managing time-consuming tasks by allowing app to seamlessly
            choose the most suitable to-dos for you.
          </h2>
        </div>
      </div>
    </>
  );
};
