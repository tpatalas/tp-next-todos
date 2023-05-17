import { STYLE_HOVER_SLATE_LIGHT } from '@data/stylePreset';
import { Menu } from '@headlessui/react';
import { SvgIcon } from '@icon/svgIcon';
import { Types } from '@lib/types';
import { TypesOptionsDropdown } from '@lib/types/options';
import { classNames } from '@stateLogics/utils';
import { selectorActiveMenuItem } from '@states/misc';
import { Tooltip } from '@tooltips/tooltips';
import { useRecoilValue } from 'recoil';

type Props = { options: TypesOptionsDropdown } & Partial<Pick<Types, 'onClick' | 'children'>>;

export const DropdownMenuItem = ({ options, onClick, children }: Props) => {
  const isActive = useRecoilValue(selectorActiveMenuItem);
  const { shouldKeepOpeningOnClick = true, isDisabled = false } = options;

  return (
    <span>
      <Tooltip options={options}>
        <Menu.Item disabled={isDisabled}>
          {({ active }) => (
            <div
              onClick={(event) => {
                onClick && onClick(event);
                shouldKeepOpeningOnClick && event.preventDefault();
              }}
              className={classNames(
                'group/menuItem block w-full cursor-pointer text-left text-sm text-gray-500',
                isDisabled
                  ? 'cursor-not-allowed select-none opacity-50'
                  : 'hover:bg-slate-600 hover:bg-opacity-10 hover:text-gray-700 focus-visible:rounded-lg',
                options.padding ?? 'px-4 py-2',
                active && isActive && STYLE_HOVER_SLATE_LIGHT,
              )}
            >
              <div className='flex flex-row'>
                {typeof options.path !== 'undefined' && (
                  <SvgIcon
                    options={{
                      path: options.path,
                      className: classNames(
                        'mr-3',
                        options.size ?? 'h-5 w-5',
                        options.color ?? 'fill-gray-500 group-hover/menuItem:fill-gray-700',
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
