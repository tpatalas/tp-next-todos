import { Dialog, Transition } from '@headlessui/react';
import { classNames } from '@states/utils';
import { Types } from 'lib/types';
import { Fragment } from 'react';

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
        <div className='fixed inset-0 bg-gray-500 bg-opacity-20' />
      </Transition.Child>
      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex h-full flex-row items-start justify-center p-4 text-center md:items-center'>
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
                'flex w-full max-w-xl transform flex-col justify-between overflow-visible rounded-2xl bg-slate-50 text-left align-middle shadow-xl transition-all',
                className,
              )}>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Fragment>
  );
};
