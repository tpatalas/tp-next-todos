'use client';

import { useVerticalScrollPosition } from '@/_lib/hooks/ui.hooks';
import { atomNavigationOpen } from '@/button/button.states';
import { cx } from 'class-variance-authority';
import { useAtomValue } from 'jotai';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  configs: {
    className: {
      default: HTMLElement['className'];
      homeSidebarClose: HTMLElement['className'];
    };
  };
}

export const HeaderWrapper = ({ children, configs }: Props) => {
  const isNavigationClose = useAtomValue(atomNavigationOpen);
  const scrollPositioned = useVerticalScrollPosition();
  const homeSidebarClose = !isNavigationClose && scrollPositioned;
  const { className } = configs;

  return <div className={cx(className.default, homeSidebarClose && className.homeSidebarClose)}>{children}</div>;
};
