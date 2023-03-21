import { STORAGE_KEY } from '@data/dataTypesConst';
import { delSessionStorage, getSessionStorage, setSessionStorage } from '@states/utils';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { atomUserOffSession } from '.';

export const UserSessionEffect = () => {
  const { status } = useSession();

  const session = useRecoilCallback(({ set }) => () => {
    if (status === 'unauthenticated') {
      set(atomUserOffSession, true);
      setSessionStorage(STORAGE_KEY['offSession'], true);
      return;
    }
    if (status === 'authenticated') {
      set(atomUserOffSession, false);
      delSessionStorage(STORAGE_KEY['offSession']);
      return;
    }
    if (status === 'loading' && !getSessionStorage(STORAGE_KEY['offSession'])) {
      set(atomUserOffSession, false);
    }
  });

  useEffect(() => {
    session();
  }, [session, status]);

  return null;
};
