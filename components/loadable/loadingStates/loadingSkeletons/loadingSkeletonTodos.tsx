import { Fragment as LoadingSkeletonFragment } from 'react';

export const LoadingSkeletonTodos = () => {
  return (
    <LoadingSkeletonFragment>
      <div className='flex max-w-7xl animate-pulse flex-row justify-start space-x-3'>
        <div className='h-5 w-5 rounded-md bg-slate-200' />
        <div className='flex w-[40rem] flex-col space-y-3'>
          <div className='h-5 w-[30rem] rounded-full bg-slate-200' />
          <div className='max-wq mb-4 h-3 w-[36rem] rounded-full bg-slate-200' />
          <div className='max-wq mb-4 h-3 w-[36rem] rounded-full bg-slate-200' />
          <div className='flex flex-row space-x-3 pt-2'>
            <div className='h-5 w-20 rounded-full bg-slate-200' />
            <div className='h-5 w-20 rounded-full bg-slate-200' />
            <div className='h-5 w-20 rounded-full bg-slate-200' />
          </div>
        </div>
        <div className='h-7 w-7 rounded-full bg-slate-200' />
      </div>
    </LoadingSkeletonFragment>
  );
};
