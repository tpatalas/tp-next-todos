import { RepeatingElements } from '@ui/repeatings/repeatingElements';
import { Fragment as LoadingSkeletonFragment } from 'react';

export const LoadingSkeletonTodos = () => {
  return (
    <LoadingSkeletonFragment>
      <div className='mr-2 flex w-full max-w-7xl animate-pulse flex-row justify-start space-x-2'>
        <div className='mr-1 flex w-[calc(100vw-7rem)] max-w-[45rem] flex-row space-x-3 md:w-[calc(65vw-5rem)] ml:w-[calc(70vw-5rem)]'>
          <div className='h-5 w-5 rounded-md bg-slate-200' />
          <div className='flex w-[94%] flex-col space-y-3'>
            <div className='h-5 w-[75%] rounded-full bg-slate-200' />
            <div className='mb-4 h-3 w-full rounded-full bg-slate-200' />
            <div className='mb-4 h-3 w-full rounded-full bg-slate-200' />
            <div className='flex flex-row space-x-3 pt-2'>
              <RepeatingElements repeats={5}>
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
