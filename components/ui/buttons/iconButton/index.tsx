import { Button } from '@buttons/button';
import { SvgIcon } from '@components/icons/svgIcon';
import { STYLE_HOVER_ENABLED_SLATE_DARK } from '@data/stylePreset';
import { Types } from '@lib/types';
import { TypesOptionsButton } from '@lib/types/typesOptions';
import { classNames } from '@stateLogics/utils';
import { Fragment as HeaderContentsFragment } from 'react';

type Props = { options: TypesOptionsButton } & Partial<
  Pick<Types, 'menuButtonContent' | 'children' | 'onClick' | 'children'>
>;

export const IconButton = ({ options, menuButtonContent, onClick, children = options.name }: Props) => {
  return (
    <span className={options.container}>
      <Button
        options={{
          className: classNames(
            options.className,
            'group-button border-slate-300 bg-transparent text-gray-500 focus-visible:ring-blue-500 hover:enabled:text-gray-700 hover:disabled:cursor-not-allowed',
            options.borderRadius ?? 'rounded-full',
            options.padding ?? 'p-2',
            options.margin ?? 'ml-px',
            options.hoverBg ?? STYLE_HOVER_ENABLED_SLATE_DARK,
            options.display,
            options.width,
          ),
          tooltip: options.tooltip,
          kbd: options.kbd,
          offset: options.offset,
          isDisabled: options.isDisabled,
        }}
        onClick={onClick}>
        <span className='flex flex-row items-center justify-center'>
          {children}
          <SvgIcon
            options={{
              path: options.path,
              className: classNames(
                options.size ?? 'h-5 w-5',
                options.color ?? 'fill-gray-500',
                !options.isDisabled && '[.group-button:hover_&]:fill-gray-700',
              ),
            }}
          />
          <HeaderContentsFragment>
            {menuButtonContent && (
              <span
                className={classNames(
                  'px-3 text-sm font-normal text-gray-500',
                  !options.isDisabled && '[.group-button:hover_&]:text-gray-700',
                )}>
                {menuButtonContent}
              </span>
            )}
          </HeaderContentsFragment>
        </span>
      </Button>
    </span>
  );
};
