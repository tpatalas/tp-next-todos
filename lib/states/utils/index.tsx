import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

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
