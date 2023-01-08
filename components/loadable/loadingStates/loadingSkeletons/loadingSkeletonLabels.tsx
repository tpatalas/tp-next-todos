import { Fragment } from 'react';

export function LoadingSkeletonLabels() {
  return (
    <Fragment>
      <div className='flex max-w-lg animate-pulse flex-col justify-start space-y-4'>
        <div className='h-4 w-[7rem] rounded-md bg-slate-200' />
        <div className='h-4 w-[5rem] rounded-md bg-slate-200' />
        <div className='h-4 w-[8rem] rounded-md bg-slate-200' />
        <div className='h-4 w-[4rem] rounded-md bg-slate-200' />
      </div>
    </Fragment>
  );
}
