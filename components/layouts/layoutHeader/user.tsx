import { STORAGE_KEY } from '@constAssertions/storage';
import { UserDropdown } from '@dropdowns/v2/userDropdown';
import { getSessionStorage } from '@stateLogics/utils';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { SignInButton } from './signInButton';

export const User = () => {
  const offSession = getSessionStorage(STORAGE_KEY['offSession']);
  const { data: session } = useSession();

  const userSession = !offSession && !!session;
  const userOffSession = !!offSession && !session;

  return (
    <Fragment>
      <div className='ml-4 flex min-w-[2rem] items-center md:ml-6'>
        {userOffSession && <SignInButton />}
        {userSession && <UserDropdown />}
      </div>
    </Fragment>
  );
};