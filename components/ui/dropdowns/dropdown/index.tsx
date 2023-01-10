import { Menu, Transition } from '@headlessui/react';
import { TypesDataDropdown } from '@lib/types/typesData';
import { classNames } from '@lib/utils';
import { SvgIcon } from 'components/icons/svgIcon';
import { Types } from 'lib/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { usePopper } from 'react-popper';
const Tooltip = dynamic(() => import('@tooltips/tooltips').then((mod) => mod.Tooltip));

type Props = { data: TypesDataDropdown } & Partial<Pick<Types, 'headerContents'>> &
  Pick<Types, 'children'>;

export const Dropdown = ({
  headerContents,
  children,
  data: {
    tooltip,
    kbd,
    menuWidth,
    borderRadius,
    path,
    hoverBg = 'hover:bg-gray-100',
    placement = 'bottom-start',
    group = 'group',
    padding = 'p-2',
    divider = true,
    initialVisible = true,
    size = 'h-5 w-5',
    color = 'fill-gray-500 group-hover:fill-gray-700',
    text = 'group-hover:text-grey-700',
    contentWidth = 'w-60',
  },
}: Props) => {
  const [isClicked, setClick] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement,
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  return (
    <span>
      <Tooltip
        tooltip={isClicked ? undefined : tooltip}
        kbd={isClicked ? undefined : kbd}>
        <Menu
          as='div'
          className={classNames('relative inline-block text-left', menuWidth)}>
          <Menu.Button
            className={classNames(
              group,
              'inline-flex w-full items-center text-gray-400 ease-in hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0',
              padding,
              hoverBg,
              initialVisible
                ? 'visible'
                : 'invisible group-focus-within:visible group-hover:visible',
              borderRadius,
              !borderRadius && headerContents ? 'rounded-lg' : 'rounded-full',
            )}
            ref={setReferenceElement}
            onMouseDown={() => setClick(true)}
            onMouseEnter={() => setClick(false)}
            onMouseLeave={() => setClick(true)}>
            <SvgIcon
              data={{
                path: path,
                className: classNames(size, color),
              }}
            />
            {headerContents && (
              <span
                className={classNames(
                  'flex flex-row items-start justify-start pl-3 text-sm font-normal text-gray-500',
                  text,
                )}>
                {headerContents}
              </span>
            )}
          </Menu.Button>

          <Transition
            as='div'
            className='relative z-20 '
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'>
            <Menu.Items
              className={classNames(
                'absolute right-0 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none',
                contentWidth,
              )}
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}>
              <div className={classNames(divider && 'divide-y divide-gray-100')}>{children}</div>
            </Menu.Items>
          </Transition>
        </Menu>
      </Tooltip>
    </span>
  );
};
