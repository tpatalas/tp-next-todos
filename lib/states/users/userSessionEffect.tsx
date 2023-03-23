import { STORAGE_KEY } from '@data/dataTypesConst';
import { delSessionStorage, setSessionStorage } from '@states/utils';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { atomUserSession } from '.';

export const UserSessionEffect = () => {
  const { data: session } = useSession();
  const offSession = session === null && typeof session !== 'undefined';

  const sessionHandler = useRecoilCallback(({ set }) => async () => {
    if (typeof session === 'undefined') return;
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
