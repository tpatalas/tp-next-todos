'use client';

import { Transition } from '@headlessui/react';
import { DATA_SMOOTH_TRANSITION } from './smoothTransition.data';
import { TypesDataTransition, PropsSmoothTransition } from './smoothTransition.types';
import { useEffect, useState } from 'react';
import { useVerticalScrollPositionTrigger } from '../transition.hooks';
import { mergeClasses } from '@/_lib/utils/misc.utils';

export const SmoothTransition = ({ children, scrollRef, options }: PropsSmoothTransition) => {
  const [hasShown, setHasShown] = useState(false);
  const {
    appear = true,
    enterDuration = 'duration-500',
    leaveDuration = 'duration-500',
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
      enter={mergeClasses(data.enter, enterDuration, delay)}
      enterFrom={mergeClasses(data.enterFrom)}
      enterTo={mergeClasses(data.enterTo)}
      leave={mergeClasses(data.leave, leaveDuration, delay)}
      leaveFrom={mergeClasses(data.leaveFrom)}
      leaveTo={mergeClasses(data.leaveTo)}
    >
      {children}
    </Transition>
  );
};
