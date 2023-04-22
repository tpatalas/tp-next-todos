import { DURATION } from '@constAssertions/ui';
import { Transition } from '@headlessui/react';
import { useVerticalScrollPositionTrigger } from '@hooks/ui';
import { classNames } from '@stateLogics/utils';
import { DATA_SMOOTH_TRANSITION } from './smoothTransition.data';
import { TRANSITION_TYPE, TypesDataTransition, TypesPropsSmoothTransition } from './smoothTransition.types';

export const SmoothTransition = ({ children, scrollRef, options }: TypesPropsSmoothTransition) => {
  const {
    show = true,
    appear = true,
    enterDuration = DURATION['500'],
    leaveDuration = DURATION['500'],
    type = TRANSITION_TYPE['fadeIn'],
    delay,
  } = options || {};
  const data = DATA_SMOOTH_TRANSITION.find((data) => data.type === type) || ({} as TypesDataTransition);
  const triggerRate = !!scrollRef ? options?.rate : undefined;
  const isShowing = !!scrollRef ? useVerticalScrollPositionTrigger(scrollRef, triggerRate) : undefined;

  return (
    <Transition
      appear={appear}
      show={isShowing ?? show}
      enter={classNames(data.enter, enterDuration, delay)}
      enterFrom={classNames(data.enterFrom)}
      enterTo={classNames(data.enterTo)}
      leave={classNames(data.leave, leaveDuration, delay)}
      leaveFrom={classNames(data.leaveFrom)}
      leaveTo={classNames(data.leaveTo)}
    >
      {children}
    </Transition>
  );
};
