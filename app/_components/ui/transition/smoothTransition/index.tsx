'use client';

import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useVerticalScrollPositionTrigger } from '../transition.hooks';
import { cx } from 'class-variance-authority';
import { PropsSmoothTransition } from '../transition.types';
import { ConfigsProps } from '@/_lib/utils/configs.utils';
import { configsTransition } from '../transition.configs';

export const SmoothTransition = ({ children, scrollRef, configs }: PropsSmoothTransition) => {
  const [hasShown, setHasShown] = useState(false);
  const { appear, enterDuration, leaveDuration, type, delay } = configs as ConfigsProps<typeof configsTransition>;

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
      enter={cx(type.enter, enterDuration, delay)}
      enterFrom={cx(type.enterFrom)}
      enterTo={cx(type.enterTo)}
      leave={cx(type.leave, leaveDuration, delay)}
      leaveFrom={cx(type.leaveFrom)}
      leaveTo={cx(type.leaveTo)}
    >
      {children}
    </Transition>
  );
};
