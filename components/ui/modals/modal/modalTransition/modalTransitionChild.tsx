import { Dialog, Transition } from '@headlessui/react';
import { Div as DivBackdrop, Div as DivTransition, Div as DivDialog } from '@containers/div';
import { Types } from 'lib/types';
import { Fragment } from 'react';
import { classNames } from '@lib/utils';

type Props = Pick<Types, 'children'> & Partial<Pick<Types, 'className'>>;

export const ModalTransitionChild = ({ children, className = 'p-5 sm:relative  sm:bottom-24' }: Props) => {
  return (
    <Fragment>
      <Transition.Child
        as={Fragment}
        enter='transition ease-out duration-150'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <DivBackdrop className='fixed inset-0 bg-gray-500 bg-opacity-20' />
      </Transition.Child>
      <DivTransition className='fixed inset-0 overflow-y-auto'>
        <DivDialog className='p-4 text-center sm:flex sm:h-full sm:flex-row sm:items-center sm:justify-center sm:p-14'>
          <Transition.Child
            as={Fragment}
            enter='transition ease-out duration-150'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'>
            <Dialog.Panel
              className={classNames(
                'flex w-full max-w-lg transform flex-col justify-between overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all',
                className,
              )}>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </DivDialog>
      </DivTransition>
    </Fragment>
  );
};
