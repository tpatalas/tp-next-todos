import { Dialog } from '@headlessui/react';
import { Types } from 'lib/types';

export const HeaderTitle = ({
  children,
  className,
}: Partial<Pick<Types, 'children' | 'className'>>) => {
  return (
    <Dialog.Title
      as='div'
      className={className || 'text-lg font-medium leading-6 text-gray-800'}
    >
      {children}
    </Dialog.Title>
  );
};
