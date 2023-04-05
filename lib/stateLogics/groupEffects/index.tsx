import { Types } from '@lib/types';
import { useEffect } from 'react';

type Props = Pick<Types, 'effects'>;

export const GroupEffects = ({ effects }: Props) => {
  useEffect(() => {
    effects.map((effect) => effect());
  }, [effects]);

  return null;
};
