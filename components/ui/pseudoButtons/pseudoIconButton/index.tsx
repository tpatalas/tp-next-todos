import { Types } from '@lib/types';
import { TypesOptionsButton } from '@lib/types/typesOptions';
import { classNames } from '@states/utils';
import dynamic from 'next/dynamic';
import { Fragment as HeaderContentsFragment } from 'react';

const SvgIcon = dynamic(() => import('@components/icons/svgIcon').then((mod) => mod.SvgIcon));
const PseudoButton = dynamic(() => import('../pseudoButton').then((mod) => mod.PseudoButton));

type Props = { options: TypesOptionsButton } & Partial<
  Pick<Types, 'menuButtonContent' | 'children' | 'onClick' | 'children'>
>;

export const PseudoIconButton = ({ options, menuButtonContent, onClick, children = options.name }: Props) => {
  return (
    <span className={options.container}>
      <PseudoButton
        options={{
          className: classNames(
            options.className,
            'group-pseudoButton border-gray-300 bg-transparent text-gray-500 hover:bg-slate-50 focus-visible:ring-blue-500 hover:text-gray-700',
            menuButtonContent ? 'rounded-lg' : 'rounded-full',
            options.padding ?? 'p-2',
            options.margin ?? 'ml-px',
            options.hoverBg ?? 'hover:bg-gray-100',
            options.display,
            options.width,
          ),
          tooltip: options.tooltip,
          kbd: options.kbd,
          offset: options.offset,
        }}
        onClick={onClick}>
        <div className='flex flex-row items-center justify-center'>
          {children}
          <SvgIcon
            options={{
              path: options.path,
              className: classNames(
                options.size ?? 'h-5 w-5',
                options.color ?? 'fill-gray-500',
                options.color && '[.group-pseudoButton:hover_&]:fill-gray-700',
              ),
            }}
          />
          <HeaderContentsFragment>
            {menuButtonContent && (
              <span className='px-3 text-sm font-normal text-gray-500 [.group-pseudoButton:hover_&]:text-gray-700'>
                {menuButtonContent}
              </span>
            )}
          </HeaderContentsFragment>
        </div>
      </PseudoButton>
    </span>
  );
};
