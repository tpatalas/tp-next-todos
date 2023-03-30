import { Types } from '@lib/types';
import { atomNavigationInitialOpen } from '@states/layouts';
import { useEffect } from 'react';
import { RecoilValue, useRecoilCallback } from 'recoil';

type Props = Pick<Types, 'layoutType'>;

export const NavigationInitialEffect = ({ layoutType }: Props) => {
  const navigationInitialHandler = useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    if (layoutType === 'app') {
      set(atomNavigationInitialOpen(layoutType), true);
      return;
    }
    !!get(atomNavigationInitialOpen(layoutType)) && reset(atomNavigationInitialOpen(layoutType));
    return;
  });

  useEffect(() => {
    navigationInitialHandler();
  }, [navigationInitialHandler]);

  return null;
};
