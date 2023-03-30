import { PATH_APP, PATH_HOME } from '@constAssertions/data';
import { STORAGE_KEY } from '@constAssertions/storage';
import { UserDropdown } from '@dropdowns/v2/userDropdown';
import { getSessionStorage } from '@stateLogics/utils';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { SignInButton } from './signInButton';
import { Types } from '@lib/types';

export const User = () => {
  const offSession = getSessionStorage(STORAGE_KEY['offSession']);
  const router = useRouter();
  const pathname = router.pathname as Types['pathname'];

  const pathNameDemo = !!offSession && pathname === PATH_HOME['demo'];
  const pathNameApp = !offSession && pathname === PATH_APP['app'];

  return (
    <Fragment>
      <div className='ml-4 flex min-w-[2rem] items-center md:ml-6'>
        {pathNameDemo && <SignInButton />}
        {pathNameApp && <UserDropdown />}
      </div>
    </Fragment>
  );
};
