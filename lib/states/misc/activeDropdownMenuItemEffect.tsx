import { Types } from '@lib/types';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { atomActiveMenuItemId } from '.';

export const ActiveDropdownMenuItemEffect = ({
  menuItemId,
}: Partial<Pick<Types, 'menuItemId'>>) => {
  const setMenuitemId = useSetRecoilState(atomActiveMenuItemId);

  useEffect(() => {
    typeof menuItemId !== 'undefined' && setMenuitemId(menuItemId);
  }, [menuItemId, setMenuitemId]);

  return null;
};
