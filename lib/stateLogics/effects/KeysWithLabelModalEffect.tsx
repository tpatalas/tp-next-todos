import { useKeyWithLabelModal } from '@hooks/keybindings';
import { TypesLabel } from '@label/label.types';
import { useEffect } from 'react';

export const KeysWithLabelModalEffect = ({ label }: Partial<Pick<TypesLabel, 'label'>>) => {
  const labelModalWithKey = useKeyWithLabelModal(label?._id);

  useEffect(() => {
    window.addEventListener('keydown', labelModalWithKey);
    return () => {
      window.removeEventListener('keydown', labelModalWithKey);
    };
  }, [labelModalWithKey]);

  return null;
};
