'use client';

import { DURATION } from '@constAssertions/ui';
import { Transition } from '@headlessui/react';
import { useVerticalScrollPositionTrigger } from '@hooks/ui';
import { classNames } from '@stateLogics/utils';
import { DATA_SMOOTH_TRANSITION } from './smoothTransition.data';
import { TypesDataTransition, PropsSmoothTransition } from './smoothTransition.types';
import { useEffect, useState } from 'react';

export const SmoothTransition = ({ children, scrollRef, options }: PropsSmoothTransition) => {
  const [hasShown, setHasShown] = useState(false);
  const {
    appear = true,
    enterDuration = DURATION['500'],
    leaveDuration = DURATION['500'],
    type = 'fadeIn',
    delay,
  } = options || {};
  const data = DATA_SMOOTH_TRANSITION.find((data) => data.type === type) || ({} as TypesDataTransition);
  const triggerRate = !!scrollRef ? options?.rate : undefined;
  const isTriggered = useVerticalScrollPositionTrigger(scrollRef, triggerRate);
  const isShowing = !!scrollRef ? isTriggered : hasShown;

  useEffect(() => {
    !!scrollRef ? false : setHasShown(true);
  }, [hasShown, scrollRef]);

  return (
    <Transition
      appear={appear}
      show={isShowing}
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
