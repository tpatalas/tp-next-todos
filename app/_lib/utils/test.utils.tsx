import { render } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import React from 'react';

export const renderAsync = async (
  element: React.ReactElement,
  { nextLink }: { nextLink?: boolean } = { nextLink: false },
) => {
  const componentType = element.type as (props: unknown) => Promise<React.ReactNode>;
  const wrapper = !!nextLink ? { wrapper: MemoryRouterProvider } : undefined;

  const ResolvedComponent = await componentType(element.props);
  render(<>{ResolvedComponent}</>, wrapper);
};
