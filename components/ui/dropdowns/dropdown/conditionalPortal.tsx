import { Portal } from '@headlessui/react';
import { Types } from '@lib/types';
import { Fragment as ConditionalPortalFragment } from 'react';

type Props = Pick<Types, 'children'> & Partial<Pick<Types, 'isPortal'>>;

export const ConditionalPortal = ({ children, isPortal }: Props) => {
  return (
    <ConditionalPortalFragment>
      {isPortal ? <Portal>{children}</Portal> : children}
    </ConditionalPortalFragment>
  );
};
