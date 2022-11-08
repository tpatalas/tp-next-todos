import { Para } from '@containers/para';
import { Dialog } from '@headlessui/react';
import { Types } from 'lib/types';

export const HeaderDescription = ({
  children,
  className,
}: Partial<Pick<Types, 'children' | 'className'>>) => {
  return (
    <Dialog.Description
      as='div'
      className={className || 'text-sm text-gray-600'}>
      <Para>{children}</Para>
    </Dialog.Description>
  );
};
