import { STORAGE_KEY } from '@data/dataTypesConst';
import { delSessionStorage, setSessionStorage } from '@states/utils';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { atomUserSession } from '.';

export const UserSessionEffect = () => {
  const { data: session } = useSession();

  const sessionHandler = useRecoilCallback(({ set, reset }) => () => {
    if (session) {
      set(atomUserSession, true);
      delSessionStorage(STORAGE_KEY['offSession']);
      return;
    }
    reset(atomUserSession);
    setSessionStorage(STORAGE_KEY['offSession'], true);
  });

  useEffect(() => {
    sessionHandler();
  }, [sessionHandler]);

  return null;
};
