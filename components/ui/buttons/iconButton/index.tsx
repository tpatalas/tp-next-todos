import { Div as DivButtonContent } from '@containers/div';
import { Span as SpanHeaderContents, Span } from '@containers/span';
import { Types } from '@lib/types';
import { TypesDataButton } from '@lib/types/typesData';
import { classNames } from '@lib/utils';
import dynamic from 'next/dynamic';
import { Fragment as HeaderContentsFragment } from 'react';

const SvgIcon = dynamic(() => import('@components/icons/svgIcon').then((mod) => mod.SvgIcon));
const Button = dynamic(() => import('../button').then((mod) => mod.Button));

type Props = { data: TypesDataButton } & Partial<
  Pick<Types, 'headerContents' | 'children' | 'onClick' | 'children'>
>;

export const IconButton = ({ data, headerContents, onClick, children = data.name }: Props) => {
  return (
    <Span className={data.containerWidth}>
      <Button
        data={{
          className: classNames(
            data.className,
            'group-button border-gray-300 bg-transparent text-gray-500 hover:bg-white focus-visible:ring-blue-500 hover:enabled:bg-gray-100 hover:enabled:text-gray-700 hover:disabled:cursor-not-allowed',
            headerContents ? 'rounded-lg' : 'rounded-full',
            data.padding || 'p-2',
            data.margin || 'ml-px',
            data.display,
            data.width,
          ),
          tooltip: data.tooltip,
          kbd: data.kbd,
          offset: data.offset,
          disabled: data.disabled,
        }}
        onClick={onClick}>
        <DivButtonContent className='flex flex-row items-center justify-center'>
          {children}
          <SvgIcon
            data={{
              path: data.path,
              className: classNames(
                data.size || 'h-5 w-5',
                data.color || 'fill-gray-500',
                data.color && !data.disabled && '[.group-button:hover_&]:fill-gray-700',
              ),
            }}
          />
          <HeaderContentsFragment>
            {headerContents && (
              <SpanHeaderContents
                className={classNames(
                  'px-3 text-sm font-normal text-gray-500',
                  !data.disabled && '[.group-button:hover_&]:text-gray-700',
                )}>
                {headerContents}
              </SpanHeaderContents>
            )}
          </HeaderContentsFragment>
        </DivButtonContent>
      </Button>
    </Span>
  );
};
