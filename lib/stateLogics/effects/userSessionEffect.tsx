import { STORAGE_KEY } from '@constAssertions/storage';
import { delSessionStorage, getSessionStorage, setSessionStorage } from '@stateLogics/utils';
import { atomUserSession } from '@states/users';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

export const UserSessionEffect = () => {
  const { data: session } = useSession();
  const offSession = session === null && typeof session !== 'undefined';
  const router = useRouter();

  const sessionHandler = useRecoilCallback(({ set }) => () => {
    if (router.pathname === '/auth') {
      !!getSessionStorage(STORAGE_KEY['offSession']) &&
        delSessionStorage(STORAGE_KEY['offSession']);
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

  useEffect(() => {
    sessionHandler();
  }, [sessionHandler]);

  return null;
};
