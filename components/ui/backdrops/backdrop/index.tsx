import { ConditionalPortal } from '@dropdowns/dropdown/conditionalPortal';
import { Transition } from '@headlessui/react';
import { Types } from '@lib/types';
import { TypesDataBackdrop } from '@lib/types/typesData';
import { classNames } from '@states/utils';
import { Fragment as BackdropFragment, Fragment, useEffect, useRef, useState } from 'react';

type Props = { data: TypesDataBackdrop } & Partial<
  Pick<Types, 'onClick' | 'show' | 'onBlur' | 'onFocus'>
>;

export const Backdrop = ({
  data: { isPortal, color, zIndex, enterDuration, leaveDuration, as },
  onClick,
  onBlur,
  onFocus,
  show,
}: Props) => {
  const [isShow, setIsShow] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = divRef && divRef.current;
    !show && setIsShow(true);

    if (!currentRef) return;
    currentRef.blur();
    currentRef.focus();
  }, [show]);

  return (
    <BackdropFragment>
      <ConditionalPortal isPortal={isPortal ?? true}>
        <Transition
          show={show ?? isShow}
          as={as ?? Fragment}
          appear={true}
          enter={classNames('transition-opacity ease-in-out', enterDuration ?? 'duration-200')}
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave={classNames('transition-opacity ease-in-out', leaveDuration ?? 'duration-200')}
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div
            tabIndex={-1}
            className={classNames(
              'fixed inset-0',
              color ?? 'bg-gray-500 bg-opacity-20',
              zIndex ?? 'z-10',
            )}
            aria-hidden='true'
            onClick={onClick}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={divRef}
          />
        </Transition>
      </ConditionalPortal>
    </BackdropFragment>
  );
};
