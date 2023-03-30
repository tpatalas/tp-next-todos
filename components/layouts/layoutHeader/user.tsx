import { STORAGE_KEY } from '@constAssertions/storage';
import { UserDropdown } from '@dropdowns/v2/userDropdown';
import { UserSessionResetEffect } from '@effects/userSessionResetEffect';
import { getSessionStorage } from '@stateLogics/utils';
import { atomUserSession } from '@states/users';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { SignInButton } from './signInButton';

export const User = () => {
  const isSession = useRecoilValue(atomUserSession);
  const offSession = getSessionStorage(STORAGE_KEY['offSession']);

  return (
    <Fragment>
      <UserSessionResetEffect />
      <div className='ml-4 flex min-w-[2rem] items-center md:ml-6'>
        {!offSession && isSession ? <UserDropdown /> : <SignInButton />}
      </div>
    </Fragment>
  );
};
