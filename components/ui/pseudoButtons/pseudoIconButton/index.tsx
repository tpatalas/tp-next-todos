import { Types } from '@lib/types';
import { TypesDataButton } from '@lib/types/typesData';
import { classNames } from '@lib/utils';
import dynamic from 'next/dynamic';
import { Fragment as HeaderContentsFragment } from 'react';

const SvgIcon = dynamic(() => import('@components/icons/svgIcon').then((mod) => mod.SvgIcon));
const PseudoButton = dynamic(() => import('../pseudoButton').then((mod) => mod.PseudoButton));

type Props = { data: TypesDataButton } & Partial<
  Pick<Types, 'headerContents' | 'children' | 'onClick' | 'children'>
>;

export const PseudoIconButton = ({
  data,
  headerContents,
  onClick,
  children = data.name,
}: Props) => {
  return (
    <span className={data.containerWidth}>
      <PseudoButton
        data={{
          className: classNames(
            data.className,
            'group-pseudoButton border-gray-300 bg-transparent text-gray-500 hover:bg-white focus-visible:ring-blue-500 hover:enabled:text-gray-700',
            headerContents ? 'rounded-lg' : 'rounded-full',
            data.padding || 'p-2',
            data.margin || 'ml-px',
            data.hoverBg || 'hover:enabled:bg-gray-100',
            data.display,
            data.width,
          ),
          tooltip: data.tooltip,
          kbd: data.kbd,
          offset: data.offset,
        }}
        onClick={onClick}>
        <div className='flex flex-row items-center justify-center'>
          {children}
          <SvgIcon
            data={{
              path: data.path,
              className: classNames(
                data.size || 'h-5 w-5',
                data.color || 'fill-gray-500',
                data.color && '[.group-pseudoButton:hover_&]:fill-gray-700',
              ),
            }}
          />
          <HeaderContentsFragment>
            {headerContents && (
              <span className='px-3 text-sm font-normal text-gray-500 [.group-pseudoButton:hover_&]:text-gray-700'>
                {headerContents}
              </span>
            )}
          </HeaderContentsFragment>
        </div>
      </PseudoButton>
    </span>
  );
};
