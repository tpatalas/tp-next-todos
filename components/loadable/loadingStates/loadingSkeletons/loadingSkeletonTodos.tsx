import { BREAKPOINT } from '@data/dataTypesObjects';
import { atomMediaQuery } from '@states/misc';
import { RepeatingElements } from '@ui/repeatings/repeatingElements';
import { Fragment as LoadingSkeletonFragment } from 'react';
import { useRecoilValue } from 'recoil';

export const LoadingSkeletonTodos = () => {
  const breakpointSm = useRecoilValue(atomMediaQuery(BREAKPOINT['sm']));
  const breakpointMd = useRecoilValue(atomMediaQuery(BREAKPOINT['md']));
  const breakpointLg = useRecoilValue(atomMediaQuery(BREAKPOINT['lg']));
  const repeatingByBreakpoint = breakpointLg ? 5 : breakpointMd ? 4 : breakpointSm ? 3 : 2;

  return (
    <LoadingSkeletonFragment>
      <div className='mr-2  flex w-full max-w-7xl animate-pulse flex-row justify-start space-x-2'>
        <div className='mr-1 flex w-[calc(100vw-9rem)] max-w-[46rem] flex-row space-x-3 md:w-[calc(65vw-7rem)] ml:w-[calc(70vw-7rem)]'>
          <div className='h-5 w-5 min-w-[1.25rem] rounded-md bg-slate-200' />
          <div className='flex w-[94%] flex-col space-y-3'>
            <div className='h-5 w-[75%] rounded-full bg-slate-200' />
            <div className='mb-4 h-3 w-full rounded-full bg-slate-200' />
            <div className='mb-4 h-3 w-full rounded-full bg-slate-200' />
            <div className='flex flex-row space-x-3 pt-2'>
              <RepeatingElements repeats={repeatingByBreakpoint}>
                <div className='h-5 w-20 rounded-full bg-slate-200' />
              </RepeatingElements>
            </div>
          </div>
        </div>
        <div className='h-6 w-6 rounded-full bg-slate-200' />
      </div>
    </LoadingSkeletonFragment>
  );
};
