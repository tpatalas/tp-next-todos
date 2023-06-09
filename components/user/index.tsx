import { STORAGE_KEY } from '@constAssertions/storage';
import { SignInButton } from '@layout/layoutHeader/signInButton';
import { getSessionStorage } from '@stateLogics/utils';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { UserDropdown } from './userDropdown';

export const User = () => {
  const offSession = getSessionStorage(STORAGE_KEY['offSession']);
  const { data: session } = useSession();

  const userOffSession = !!offSession && !session;

  return (
    <Fragment>
      <div className='ml-4 flex min-w-[2rem] items-center md:ml-6'>
        <SmoothTransition>{userOffSession ? <SignInButton /> : <UserDropdown />}</SmoothTransition>
      </div>
    </Fragment>
  );
};
