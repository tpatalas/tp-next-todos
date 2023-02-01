import { SvgIcon } from '@components/icons/svgIcon';
import { STYLE_HOVER_SLATE_LIGHT } from '@data/stylePreset';
import { Menu } from '@headlessui/react';
import { Types } from '@lib/types';
import { selectorActiveMenuItem } from '@states/misc';
import { classNames } from '@states/utils';
import { Tooltip } from '@tooltips/tooltips';
import { useRecoilValue } from 'recoil';

type Props = Partial<
  Pick<
    Types,
    | 'tooltip'
    | 'kbd'
    | 'onClick'
    | 'children'
    | 'isDisabledCloseOnClick'
    | 'path'
    | 'padding'
    | 'size'
    | 'color'
  >
>;

export const DropdownMenuItem = ({
  tooltip,
  kbd,
  onClick,
  padding,
  path,
  size,
  color,
  children,
  isDisabledCloseOnClick = true,
}: Props) => {
  const isActive = useRecoilValue(selectorActiveMenuItem);

  return (
    <span>
      <Tooltip
        tooltip={tooltip}
        kbd={kbd}>
        <Menu.Item>
          {({ active }) => (
            <div
              onClick={(event) => {
                onClick && onClick(event);
                isDisabledCloseOnClick && event.preventDefault();
              }}
              className={classNames(
                'group-1 block w-full cursor-pointer text-left text-sm text-gray-500 hover:bg-slate-600 hover:bg-opacity-10 hover:text-gray-700 focus-visible:rounded-md',
                padding ?? 'px-4 py-2',
                active && isActive && STYLE_HOVER_SLATE_LIGHT,
              )}>
              <div className='flex flex-row'>
                {typeof path !== 'undefined' && (
                  <SvgIcon
                    data={{
                      path: path,
                      className: classNames(
                        'mr-3',
                        size ?? 'h-5 w-5',
                        color ?? 'fill-gray-500 [.group-1:hover_&]:fill-gray-700',
                      ),
                    }}
                  />
                )}
                {typeof children !== 'undefined' && children}
              </div>
            </div>
          )}
        </Menu.Item>
      </Tooltip>
    </span>
  );
};
