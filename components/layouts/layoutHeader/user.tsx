import { STORAGE_KEY } from '@constAssertions/storage';
import { DURATION } from '@constAssertions/ui';
import { UserDropdown } from '@dropdowns/v2/userDropdown';
import { getSessionStorage } from '@stateLogics/utils';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { SignInButton } from './signInButton';

export const User = () => {
  const offSession = getSessionStorage(STORAGE_KEY['offSession']);
  const { data: session } = useSession();
  const transitionOptions = { enterDuration: DURATION['500'], leaveDuration: DURATION['500'] };

  const userOffSession = !!offSession && !session;

  return (
    <Fragment>
      <div className='ml-4 flex min-w-[2rem] items-center md:ml-6'>
        <SmoothTransition
          type='fadeOut'
          options={transitionOptions}>
          {userOffSession ? <SignInButton /> : <UserDropdown />}
        </SmoothTransition>
      </div>
    </Fragment>
  );
};
