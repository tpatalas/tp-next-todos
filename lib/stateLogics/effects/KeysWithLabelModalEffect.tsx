import { useKeyWithLabelModal } from '@hooks/keybindings';
import { Types } from '@lib/types';
import { useEffect } from 'react';

export const KeysWithLabelModalEffect = ({ label }: Partial<Pick<Types, 'label'>>) => {
  const labelModalWithKey = useKeyWithLabelModal(label?._id);

  useEffect(() => {
    window.addEventListener('keydown', labelModalWithKey);
    return () => {
      window.removeEventListener('keydown', labelModalWithKey);
    };
  }, [labelModalWithKey]);

  return null;
};
