import { PropsDividerX } from '../divider.types';

export const DividerX = ({ children, style }: PropsDividerX) => {
  return (
    <div className='relative'>
      <div
        className='absolute inset-0 flex items-center justify-center'
        aria-hidden='true'
      >
        <div
          className={style}
          data-testid='dividerX-testid'
        />
      </div>
      {!!children && (
        <div className='relative flex justify-center'>
          <span className='bg-slate-50 px-2 text-sm text-gray-500'>{children}</span>
        </div>
      )}
    </div>
  );
};
