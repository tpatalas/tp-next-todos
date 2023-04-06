import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';

type Props = Partial<Pick<Types, 'children' | 'margin'>>;

export const DividerX = ({ children, margin }: Props) => {
  return (
    <div className={classNames('relative', margin)}>
      <div
        className='absolute inset-0 flex items-center'
        aria-hidden='true'>
        <div className='w-full border-t border-gray-300' />
      </div>
      {children && (
        <div className='relative flex justify-center'>
          <span className='bg-slate-50 px-2 text-sm text-gray-500'>{children}</span>
        </div>
      )}
    </div>
  );
};
