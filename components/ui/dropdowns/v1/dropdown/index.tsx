import { STYLE_HOVER_SLATE_DARK } from '@data/stylePreset';
import { Menu, Transition } from '@headlessui/react';
import { atomOnBlur } from '@states/focus';
import { Types } from 'lib/types';
import dynamic from 'next/dynamic';
import { Fragment, Fragment as MenuFragment, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { useSetRecoilState } from 'recoil';
import { ConditionalPortal } from './conditionalPortal';
import { DisableScrollEffect } from '@effects/disableScrollEffect';
import { classNames } from '@stateLogics/utils';
import { TypesOptionsDropdown } from '@lib/types/options';
import { SvgIcon } from '@icon/svgIcon';
const Tooltip = dynamic(() => import('@tooltips/tooltips').then((mod) => mod.Tooltip));

type Props = { options: TypesOptionsDropdown } & Partial<
  Pick<Types, 'menuButtonContent' | 'show' | 'menuContentOnClose'>
> &
  Pick<Types, 'children'>;

export const Dropdown = ({ menuButtonContent, menuContentOnClose, children, show, options }: Props) => {
  const {
    hasDivider = true,
    hasDropdownBoardStyle = true,
    isPortal = true,
    isInitiallyVisible = true,
  } = options;
  const [isClicked, setClick] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: options.placement ?? 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 5] } }],
  });
  const setFocusOnBlur = useSetRecoilState(atomOnBlur);
  const focusRef = useRef<HTMLButtonElement>(null);

  const visibility = (initialVisible: boolean, open: boolean) => {
    if (initialVisible || open) return 'visible';
    return 'invisible group-hover:visible';
  };

  return (
    <span>
      <Menu
        as='div'
        className={classNames('relative inline-block text-left', options.menuWidth, options.menuHeight)}
      >
        {({ open }) => (
          <Tooltip
            options={{
              tooltip: isClicked || open ? undefined : options.tooltip,
              kbd: isClicked || open ? undefined : options.kbd,
            }}
          >
            <MenuFragment>
              <div ref={setReferenceElement}>
                <Menu.Button as={Fragment}>
                  <button
                    className={classNames(
                      options.group ?? 'group',
                      'inline-flex w-full items-center text-gray-400 ease-in hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 sm:ml-0',
                      options.padding ?? 'p-2',
                      options.hoverBg ?? STYLE_HOVER_SLATE_DARK,
                      options.borderRadius && menuButtonContent ? options.borderRadius : 'rounded-full',
                      visibility(isInitiallyVisible ?? true, open),
                    )}
                    onMouseDown={() => setClick(true)}
                    onMouseEnter={() => setClick(false)}
                    onMouseLeave={() => setClick(true)}
                    onClick={() => setFocusOnBlur(true)}
                    onKeyDown={(event: React.KeyboardEvent) => {
                      event.preventDefault();
                      event.key === 'Escape' && focusRef.current!.blur();
                    }}
                    ref={focusRef}
                  >
                    <SvgIcon
                      options={{
                        path: options.path,
                        className: classNames(
                          options.size ?? 'h-5 w-5',
                          options.color ?? 'fill-gray-500 group-hover:fill-gray-700',
                        ),
                        testId: 'dropdown-svgIcon-testid',
                      }}
                    />
                    {menuButtonContent && (
                      <span
                        className={classNames(
                          'flex flex-row items-start justify-start whitespace-nowrap pl-3 text-sm font-normal text-gray-500',
                          options.text ?? 'group-hover:text-gray-700',
                        )}
                      >
                        {menuButtonContent}
                      </span>
                    )}
                  </button>
                </Menu.Button>
              </div>
              {!open && menuContentOnClose}
              <Transition
                as='div'
                show={show ? show : open}
                className='relative z-20 '
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <ConditionalPortal isPortal={isPortal}>
                  <DisableScrollEffect open={open} />
                  <Menu.Items
                    className={classNames(
                      'absolute right-0 z-50 origin-top-right focus:outline-none',
                      options.menuItemsWidth ?? 'w-60',
                      hasDropdownBoardStyle &&
                        'rounded-lg bg-slate-50 shadow-xl ring-1 ring-black ring-opacity-5',
                    )}
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    static
                  >
                    <div className={classNames(hasDivider && 'divide-y divide-gray-100')}>{children}</div>
                  </Menu.Items>
                </ConditionalPortal>
              </Transition>
            </MenuFragment>
          </Tooltip>
        )}
      </Menu>
    </span>
  );
};
