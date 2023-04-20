import { DURATION } from '@constAssertions/ui';
import { Transition } from '@headlessui/react';
import { useVerticalScrollPositionTrigger } from '@hooks/ui';
import { classNames } from '@stateLogics/utils';
import { DATA_SMOOTH_TRANSITION } from './smoothTransition.data';
import { TypesDataTransition, TypesPropsSmoothTransition } from './smoothTransition.types';

export const SmoothTransition = ({ children, type, scrollRef, options }: TypesPropsSmoothTransition) => {
  const data = DATA_SMOOTH_TRANSITION.find((data) => data.type === type) || ({} as TypesDataTransition);
  const triggerRate = !!scrollRef ? options?.triggerRate : undefined;
  const isShowing = !!scrollRef ? useVerticalScrollPositionTrigger(scrollRef, triggerRate) : undefined;
  const {
    show = true,
    isInitiallyVisible = true,
    enterDuration = DURATION['300'],
    leaveDuration = DURATION['300'],
  } = options || {};

  return (
    <Transition
      appear={isInitiallyVisible}
      show={isShowing ?? show}
      enter={classNames(data.enter, enterDuration)}
      enterFrom={classNames(data.enterFrom)}
      enterTo={classNames(data.enterTo)}
      leave={classNames(data.leave, leaveDuration)}
      leaveFrom={classNames(data.leaveFrom)}
      leaveTo={classNames(data.leaveTo)}>
      {children}
    </Transition>
  );
};
