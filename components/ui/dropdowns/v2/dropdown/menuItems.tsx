import { ConditionalPortal } from '@dropdowns/v1/dropdown/conditionalPortal';
import { Menu, Transition } from '@headlessui/react';
import { DisableScrollEffect } from '@lib/stateLogics/effects/ui/disableScrollEffect';
import { Types } from '@lib/types';
import { TypesOptionsDropdown } from '@lib/types/typesOptions';
import { classNames } from '@states/utils';
import { useState } from 'react';
import { usePopper } from 'react-popper';

type Props = { options: TypesOptionsDropdown } & Pick<Types, 'referenceElement' | 'children' | 'open'>;

export const MenuItems = ({ referenceElement, open, children, options }: Props) => {
  const { hasDivider = true, hasDropdownBoardStyle = true, isPortal = true } = options;
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: options.placement ?? 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 5] } }],
  });

  return (
    <Transition
      as='div'
      show={options.show ? options.show : open}
      className='relative z-20 '
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'>
      <ConditionalPortal isPortal={isPortal}>
        <DisableScrollEffect open={open} />
        <Menu.Items
          className={classNames(
            'absolute right-0 z-50 origin-top-right focus:outline-none',
            options.menuItemsWidth ?? 'w-60',
            hasDropdownBoardStyle && 'rounded-lg bg-slate-50 shadow-xl ring-1 ring-black ring-opacity-5',
          )}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          static>
          <div className={classNames(hasDivider && 'divide-y divide-gray-100')}>{children}</div>
        </Menu.Items>
      </ConditionalPortal>
    </Transition>
  );
};
