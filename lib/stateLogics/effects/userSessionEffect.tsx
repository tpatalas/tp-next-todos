import { PATH_HOME } from '@constAssertions/data';
import { STORAGE_KEY } from '@constAssertions/storage';
import { Types } from '@lib/types';
import { delSessionStorage, getSessionStorage, setSessionStorage } from '@stateLogics/utils';
import { atomPathname } from '@states/misc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

export const UserSessionEffect = () => {
  const { data: session } = useSession();
  const offSession = session === null && typeof session !== 'undefined';
  const router = useRouter();
  const pathname = router.pathname as Types['pathname'];

  const sessionHandler = useRecoilCallback(({ set }) => () => {
    set(atomPathname, pathname);

    if (pathname === PATH_HOME['auth']) {
      !!getSessionStorage(STORAGE_KEY['offSession']) &&
        delSessionStorage(STORAGE_KEY['offSession']);
      return;
    }
    if (offSession) {
      setSessionStorage(STORAGE_KEY['offSession'], true);
      return;
    }
    if (session) {
      delSessionStorage(STORAGE_KEY['offSession']);
      return;
    }
  });

  useEffect(() => {
    sessionHandler();
  }, [sessionHandler]);

  return null;
};
