import { Types } from '@lib/types';

type Props = Partial<Pick<Types, 'children'>>;

export const Divider = ({ children }: Props) => {
  return (
    <div className='relative'>
      <div className='absolute inset-0 flex items-center' aria-hidden='true'>
        <div className='w-full border-t border-gray-200' />
      </div>
      {children && (
        <div className='relative flex justify-center'>
          <span className='bg-white px-2 text-sm text-gray-500'>
            {children}
          </span>
        </div>
      )}
    </div>
  );
};
