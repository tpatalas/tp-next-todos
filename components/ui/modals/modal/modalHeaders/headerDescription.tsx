import { Dialog } from '@headlessui/react';
import { Types } from 'lib/types';

export const HeaderDescription = ({
  children,
  className,
}: Partial<Pick<Types, 'children' | 'className'>>) => {
  return (
    <Dialog.Description
      as='div'
      className={className || 'p-1 text-base text-gray-600 will-change-transform'}
    >
      <p>{children}</p>
    </Dialog.Description>
  );
};
