import { Types } from '@lib/types';
import { atomLayoutType } from '@states/layouts';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

type Props = Pick<Types, 'layoutType'>;

export const LayoutTypeEffect = ({ layoutType }: Props) => {
  const layoutTypeHandler = useRecoilCallback(({ set }) => () => {
    set(atomLayoutType, layoutType);
  });

  useEffect(() => {
    layoutTypeHandler();
  }, [layoutTypeHandler]);

  return null;
};
