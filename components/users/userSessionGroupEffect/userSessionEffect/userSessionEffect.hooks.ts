import { PATH_HOME } from '@constAssertions/data';
import { STORAGE_KEY } from '@constAssertions/storage';
import { Types } from '@lib/types';
import { delSessionStorage, getSessionStorage, setSessionStorage } from '@stateLogics/utils';
import { atomUserSession } from '@users/user/user.states';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next-router-mock';
import { useRecoilCallback } from 'recoil';

export const useUserSession = () => {
  const { data: session } = useSession();
  const offSession = session === null && typeof session !== 'undefined';
  const router = useRouter();
  const pathname = router.pathname as Types['pathname'];

  return useRecoilCallback(({ set }) => () => {
    if (pathname === PATH_HOME['auth']) {
      !!getSessionStorage(STORAGE_KEY['offSession']) && delSessionStorage(STORAGE_KEY['offSession']);
      return;
    }
    if (offSession) {
      set(atomUserSession, false);
      setSessionStorage(STORAGE_KEY['offSession'], true);
      return;
    }
    if (session) {
      set(atomUserSession, true);
      delSessionStorage(STORAGE_KEY['offSession']);
      return;
    }
  });
};
