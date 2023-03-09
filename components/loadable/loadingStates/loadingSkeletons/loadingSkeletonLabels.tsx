import { Fragment } from 'react';

export function LoadingSkeletonLabels() {
  return (
    <Fragment>
      <div className='mt-3 flex max-w-lg animate-pulse flex-col justify-start space-y-4'>
        <div className='h-4 w-[7rem] rounded-lg bg-slate-200' />
        <div className='h-4 w-[5rem] rounded-lg bg-slate-200' />
        <div className='h-4 w-[8rem] rounded-lg bg-slate-200' />
        <div className='h-4 w-[4rem] rounded-lo bg-slate-200' />
      </div>
    </Fragment>
  );
}
