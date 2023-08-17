import { ReactNode } from 'react';
import { SmoothTransition } from '../smoothTransition';
import { configsTransition } from '../transition.configs';

/**
 * Wrapper server component for client component of SmoothTransition
 * */

export const SmoothTransitionWithDefaultConfigs = ({ children }: { children: ReactNode }) => {
  const defaultConfigs = configsTransition();

  return <SmoothTransition configs={defaultConfigs}>{children}</SmoothTransition>;
};
