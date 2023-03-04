import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { atomIDBUserSession } from '.';

export const UserSessionEffect = () => {
  const { status } = useSession();

  const userSession = useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (status === 'authenticated') {
      !get(atomIDBUserSession) && set(atomIDBUserSession, true);
      return;
    }
    get(atomIDBUserSession) && reset(atomIDBUserSession);
    return;
  });

  useEffect(() => {
    userSession();
  }, [userSession]);
  return null;
};
