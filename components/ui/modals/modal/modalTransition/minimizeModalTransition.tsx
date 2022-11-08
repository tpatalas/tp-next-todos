import { Transition } from '@headlessui/react';
import { Types } from 'lib/types';
import { Fragment } from 'react';
import {
  Div as DivPositionY,
  Div as DivPositionX,
  Div as DivClickableBackdrop,
  Div as DivMinimizeModal,
} from '@containers/div';
import { classNames } from '@lib/utils';
import { TypesDataMinimizedModalTransition } from '@lib/types/typesData';

type Props = { data: TypesDataMinimizedModalTransition } & Pick<Types, 'show' | 'children'>;

export const MinimizeModalTransition = ({
  children,
  show,
  data: { positionY, positionX, minimizedModalPadding = 'p-3.5' },
}: Props) => {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter='transition transform ease-out duration-300'
      enterFrom='transform translate-y-5 opacity-0 scale-95'
      enterTo='transform translate-y-0 opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform translate-y-0 opacity-100 scale-100'
      leaveTo='transform translate-y-5 opacity-0 scale-95'>
      <DivPositionY
        className={classNames(
          'pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:p-6',
          positionY,
        )}>
        <DivPositionX className={classNames('flex w-full flex-col items-center space-y-4', positionX)}>
          <DivClickableBackdrop className='pointer-events-auto w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
            <DivMinimizeModal className={classNames(minimizedModalPadding)}>{children}</DivMinimizeModal>
          </DivClickableBackdrop>
        </DivPositionX>
      </DivPositionY>
    </Transition>
  );
};
