import { CATCH_MODAL } from '@data/dataTypesObjects';
import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { atom, atomFamily, RecoilRoot } from 'recoil';

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
export const classNames = (...classes: unknown[]) => classes.filter(Boolean).join(' ') || undefined;

// Query Joins
export const queries = (...queries: unknown[]) => queries.filter(Boolean).join('&') || '';

// path joins
export const paths = (...paths: unknown[]) => paths.filter(Boolean).join('') || '';

// test-utils for custom render
const RecoilRootProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export const renderWithRecoilRoot = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: RecoilRootProvider, ...options });
