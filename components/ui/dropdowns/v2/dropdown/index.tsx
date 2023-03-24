import { Button } from '@buttons/button';
import { STYLE_HOVER_SLATE_DARK } from '@data/stylePreset';
import { Menu } from '@headlessui/react';
import { atomOnBlur } from '@states/focus';
import { Types } from 'lib/types';
import { Fragment, Fragment as MenuFragment, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { MenuItems } from './menuItems';
import { classNames } from '@stateLogics/utils';
import { TypesOptionsDropdown } from '@lib/types/options';

type Props = { options: TypesOptionsDropdown } & Pick<Types, 'children'> &
  Partial<Pick<Types, 'menuButtonContent' | 'menuContentOnClose' | 'menuButtonIcon'>>;

export const Dropdown = ({ menuButtonIcon, menuButtonContent, menuContentOnClose, children, options }: Props) => {
  const { isInitiallyVisible = true } = options;
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
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
        className={classNames('relative inline-block text-left', options.menuWidth, options.menuHeight)}>
        {({ open }) => (
          <MenuFragment>
            <div ref={setReferenceElement}>
              <Menu.Button as={Fragment}>
                <Button
                  options={{
                    className: classNames(
                      options.group ?? 'group',
                      'inline-flex w-full items-center text-gray-400 outline-none ease-in hover:text-gray-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 sm:ml-0',
                      options.padding ?? 'p-2',
                      options.hoverBg && !options.hoverRing && STYLE_HOVER_SLATE_DARK,
                      options.borderRadius && menuButtonContent ? options.borderRadius : 'rounded-full',
                      options.transition ?? 'transition-all hover:transition-all',
                      options.hoverRing,
                      visibility(isInitiallyVisible ?? true, open),
                    ),
                    tooltip: options.tooltip,
                    kbd: options.kbd,
                  }}
                  onClick={() => setFocusOnBlur(true)}
                  onKeyDown={(event: React.KeyboardEvent) => {
                    event.preventDefault();
                    event.key === 'Escape' && focusRef.current!.blur();
                  }}
                  ref={focusRef}>
                  {menuButtonIcon}
                  {menuButtonContent}
                </Button>
              </Menu.Button>
            </div>
            {!open && menuContentOnClose}
            <MenuItems
              options={options}
              open={open}
              referenceElement={referenceElement}>
              {children}
            </MenuItems>
          </MenuFragment>
        )}
      </Menu>
    </span>
  );
};
