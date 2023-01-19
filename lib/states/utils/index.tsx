import { CATCH_MODAL } from '@data/stateObjects';
import { atomFamily, atom } from 'recoil';
import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

/**
 * Atoms
 */
export const atomCatch = atomFamily<boolean, CATCH_MODAL>({
  key: 'atomCatch',
  default: false,
});

export const atomDisableScroll = atom<boolean>({
  key: 'atomDisableScroll',
  default: false,
});

/**
 * Utils
 **/

// Days
export const dayInSecond = 60 * 60 * 24;

// tailwind classNames
export const classNames = (...classes: unknown[]) => {
  return classes.filter(Boolean).join(' ') || undefined;
};

// Query Joins
export const queries = (...queries: unknown[]) => {
  return queries.filter(Boolean).join('&') || '';
};

// test-utils for custom render
const RecoilRootProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export const renderWithRecoilRoot = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: RecoilRootProvider, ...options });
