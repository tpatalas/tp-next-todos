import { SvgIcon } from '@/icon/svgIcon';
import { cx } from 'class-variance-authority';
import { PropsIconButtonContent } from './iconButtonContent.types';
import { configsSvgIcon } from '@/icon/svgIcon/svgIcon.configs';

export const IconButtonContent = ({ children, extraContent, disabled }: PropsIconButtonContent) => {
  return (
    <span className='flex flex-row items-center justify-center'>
      {children}
      <SvgIcon configs={configsSvgIcon({ className: disabled ? 'group' : 'noHover' })} />
      {extraContent && (
        <span
          className={cx('px-3 text-sm font-normal text-gray-500', !disabled && '[.group-button:hover_&]:text-gray-700')}
        >
          {extraContent}
        </span>
      )}
    </span>
  );
};
