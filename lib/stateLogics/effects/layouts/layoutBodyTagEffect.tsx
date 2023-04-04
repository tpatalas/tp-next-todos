import { Types } from '@lib/types';
import { useEffect } from 'react';

type Props = Pick<Types, 'layoutType'>;

export const LayoutBodyTagEffect = ({ layoutType }: Props) => {
  useEffect(() => {
    layoutType === 'app' ? document.body.classList.add('overflow-hidden') : '';
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [layoutType]);

  return null;
};
