import { ConditionalPortal } from '@dropdowns/v1/dropdown/conditionalPortal';
import { Transition } from '@headlessui/react';
import { Types } from '@lib/types';
import { TypesOptionsBackdrop } from '@lib/types/options';
import { classNames } from '@stateLogics/utils';
import { Fragment as BackdropFragment, Fragment, useEffect, useRef } from 'react';

type Props = { options: TypesOptionsBackdrop } & Partial<Pick<Types, 'onClick' | 'onBlur' | 'onFocus'>>;

export const Backdrop = ({ options, onClick, onBlur, onFocus }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = divRef && divRef.current;

    if (!currentRef) return;
    currentRef.blur();
    currentRef.focus();
  }, []);

  return (
    <BackdropFragment>
      <ConditionalPortal isPortal={options.isPortal ?? true}>
        <Transition.Child
          as={Fragment}
          enter={classNames('transition-opacity ease-in-out', options.enterDuration ?? 'duration-300')}
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave={classNames('transition-opacity ease-in-out', options.leaveDuration ?? 'duration-100')}
          leaveFrom='opacity-0'
          leaveTo='opacity-0'
        >
          <div
            tabIndex={-1}
            className={classNames(
              'fixed inset-0',
              options.color ?? 'bg-gray-500 bg-opacity-20',
              options.zIndex ?? 'z-20',
            )}
            aria-hidden='true'
            onClick={onClick}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={divRef}
            data-testid='backdrop'
          />
        </Transition.Child>
      </ConditionalPortal>
    </BackdropFragment>
  );
};
