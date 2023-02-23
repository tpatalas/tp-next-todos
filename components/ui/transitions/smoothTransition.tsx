import { DURATION } from '@data/dataTypesConst';
import { Transition } from '@headlessui/react';
import { Types } from '@lib/types';
import { classNames } from '@states/utils';
import { useCallback, useEffect, useState } from 'react';

type Props = Pick<Types, 'children'> & Partial<Pick<Types, 'enterDuration' | 'leaveDuration'>>;

export const SmoothTransition = ({ children, enterDuration = DURATION[100], leaveDuration = DURATION[150] }: Props) => {
  const [isShowing, setIsShowing] = useState(false);

  const setTransition = useCallback(() => {
    setIsShowing(true);
  }, []);

  useEffect(() => {
    setTransition();
  }, [setTransition]);

  return (
    <Transition
      show={isShowing}
      as='div'
      enter={classNames('transition-opacity ease-in-out', enterDuration)}
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave={classNames('transition-opacity ease-in-out', leaveDuration)}
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      className='flex'>
      {children}
    </Transition>
  );
};
