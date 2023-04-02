import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';

type optionTypeDivider = 'margin' | 'hidden' | 'width';
type Props = { options?: Partial<Record<optionTypeDivider, string>> } & Partial<
  Pick<Types, 'children'>
>;

export const DividerX = ({ children, options }: Props) => {
  const { margin, hidden, width = 'w-full' } = options || {};

  return (
    <div className={classNames('relative', margin, hidden)}>
      <div
        className='absolute inset-0 flex items-center justify-center'
        aria-hidden='true'>
        <div className={classNames('border-t border-gray-300', width)} />
      </div>
      {children && (
        <div className='relative flex justify-center'>
          <span className='bg-slate-50 px-2 text-sm text-gray-500'>{children}</span>
        </div>
      )}
    </div>
  );
};
