'use client';

import { Transition } from '@headlessui/react';
import { DATA_SMOOTH_TRANSITION } from './smoothTransition.data';
import { TypesDataTransition, PropsSmoothTransition } from './smoothTransition.types';
import { useEffect, useState } from 'react';
import { useVerticalScrollPositionTrigger } from '../transition.hooks';
import { cx } from 'class-variance-authority';

export const SmoothTransition = ({ children, scrollRef, configs }: PropsSmoothTransition) => {
  const [hasShown, setHasShown] = useState(false);
  const {
    appear = true,
    enterDuration = 'duration-500',
    leaveDuration = 'duration-500',
    type = 'fadeIn',
    delay,
  } = configs || {};
  const data = DATA_SMOOTH_TRANSITION.find((data) => data.type === type) || ({} as TypesDataTransition);
  const triggerRate = !!scrollRef ? configs?.rate : undefined;
  const isTriggered = useVerticalScrollPositionTrigger(scrollRef, triggerRate);
  const isShowing = !!scrollRef ? isTriggered : hasShown;

  useEffect(() => {
    !!scrollRef ? false : setHasShown(true);
  }, [hasShown, scrollRef]);

  return (
    <Transition
      appear={appear}
      show={isShowing}
      enter={cx(data.enter, enterDuration, delay)}
      enterFrom={cx(data.enterFrom)}
      enterTo={cx(data.enterTo)}
      leave={cx(data.leave, leaveDuration, delay)}
      leaveFrom={cx(data.leaveFrom)}
      leaveTo={cx(data.leaveTo)}
    >
      {children}
    </Transition>
  );
};
