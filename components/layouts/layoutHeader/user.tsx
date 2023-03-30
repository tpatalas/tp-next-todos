import { PATH_HOME } from '@constAssertions/data';
import { STORAGE_KEY } from '@constAssertions/storage';
import { UserDropdown } from '@dropdowns/v2/userDropdown';
import { getSessionStorage } from '@stateLogics/utils';
import { atomUserSession } from '@states/users';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { SignInButton } from './signInButton';

export const User = () => {
  const isSession = useRecoilValue(atomUserSession);
  const offSession = getSessionStorage(STORAGE_KEY['offSession']);
  const router = useRouter();
  const demoSession = router.asPath === PATH_HOME['demo'];
  const userOffSession = !isSession && offSession && demoSession;

  return (
    <Fragment>
      <div className='ml-4 flex min-w-[2rem] items-center md:ml-6'>
        {userOffSession ? <SignInButton /> : <UserDropdown />}
      </div>
    </Fragment>
  );
};
