import { Transition } from '@headlessui/react';
import { Types } from 'lib/types';
import { Fragment } from 'react';
import { TypesOptionsMinimizedModalTransition } from '@lib/types/typesOptions';
import { classNames } from '@stateLogics/utils';

type Props = { options: TypesOptionsMinimizedModalTransition } & Pick<Types, 'show' | 'children'>;

export const MinimizeModalTransition = ({ children, show, options }: Props) => {
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
      <div
        className={classNames(
          'pointer-events-none fixed inset-0 z-[100] flex items-end px-4 py-6 sm:p-6',
          options.positionY,
        )}>
        <div className={classNames('flex w-full flex-col items-center space-y-4', options.positionX)}>
          <div className='pointer-events-auto w-full max-w-xs overflow-hidden rounded-lg bg-slate-50 shadow-lg ring-1 ring-black ring-opacity-5'>
            <div className={classNames(options.minimizedModalPadding ?? 'p-3.5')}>{children}</div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
