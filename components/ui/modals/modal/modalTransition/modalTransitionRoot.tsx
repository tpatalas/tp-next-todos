import { Dialog, Transition } from '@headlessui/react';
import { Types } from 'lib/types';
import { Fragment } from 'react';

type Props = Pick<Types, 'children' | 'show' | 'onClose'> & Partial<Pick<Types, 'initialFocus' | 'children'>>;

export const ModalTransitionRoot = ({ children, show, onClose, initialFocus }: Props) => {
  return (
    <Transition.Root
      show={show}
      as={Fragment}>
      <Dialog
        as='div'
        onClose={onClose}
        initialFocus={initialFocus}
        className='relative inset-0 z-50 overflow-y-visible'>
        {children}
      </Dialog>
    </Transition.Root>
  );
};
