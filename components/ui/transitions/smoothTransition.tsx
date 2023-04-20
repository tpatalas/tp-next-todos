import { DURATION } from '@constAssertions/ui';
import { Transition } from '@headlessui/react';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';

type Props = Pick<Types, 'children'> & {
  options?: Partial<Pick<Types, 'enterDuration' | 'leaveDuration'>>;
};

export const SmoothTransition = ({ children, options }: Props) => {
  const { enterDuration = DURATION['300'], leaveDuration = DURATION['300'] } = options || {};
  return (
    <Transition
      appear={true}
      show={true}
      enter={classNames('transition-opacity ease-in-out', enterDuration)}
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave={classNames('transition-opacity ease-in-out', leaveDuration)}
      leaveFrom='opacity-100'
      leaveTo='opacity-0'>
      {children}
    </Transition>
  );
};
