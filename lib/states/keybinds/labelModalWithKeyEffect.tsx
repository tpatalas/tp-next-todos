import { Types } from '@lib/types';
import { useKeyWithLabelModal } from '@states/keybinds/hooks';
import { useEffect } from 'react';

export const LabelModalWithKeyEffect = ({ label }: Partial<Pick<Types, 'label'>>) => {
  const labelModalWithKey = useKeyWithLabelModal(label?._id);

  useEffect(() => {
    window.addEventListener('keydown', labelModalWithKey);
    return () => {
      window.removeEventListener('keydown', labelModalWithKey);
    };
  }, [labelModalWithKey]);

  return null;
};
