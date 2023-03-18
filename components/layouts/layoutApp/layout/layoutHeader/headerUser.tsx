import { Button } from '@buttons/button';
import { STORAGE_KEY } from '@data/dataTypesConst';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { UserDropdown } from '@dropdowns/v2/userDropdown';
import { atomIDBUserSession } from '@states/users';
import { UserSessionEffect } from '@states/users/userSessionEffect';
import { classNames, getSessionStorage } from '@states/utils';
import { signIn } from 'next-auth/react';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

export const HeaderUser = () => {
  const isSession = useRecoilValue(atomIDBUserSession);
  const session = getSessionStorage(STORAGE_KEY['session']);
  // add additional condition to prevent the flickering of user avatar

  return (
    <Fragment>
      <UserSessionEffect />
      {session && isSession ? (
        <UserDropdown />
      ) : (
        <Button
          options={{
            className: classNames(STYLE_BUTTON_NORMAL_BLUE),
            tooltip: 'Sign in',
          }}
          onClick={() => signIn()}>
          Sign in
        </Button>
      )}
    </Fragment>
  );
};
