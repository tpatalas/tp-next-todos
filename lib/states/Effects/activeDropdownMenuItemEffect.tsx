import { Types } from '@lib/types';
import { atomActiveMenuItemId } from '@states/atoms';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export const ActiveDropdownMenuItemEffect = ({
  menuItemId,
}: Partial<Pick<Types, 'menuItemId'>>) => {
  const setMenuitemId = useSetRecoilState(atomActiveMenuItemId);

  useEffect(() => {
    typeof menuItemId !== 'undefined' && setMenuitemId(menuItemId);
  });

  return null;
};
