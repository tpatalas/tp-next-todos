import { Button } from '@buttons/button';
import { STORAGE_KEY } from '@data/dataTypesConst';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { UserDropdown } from '@dropdowns/v2/userDropdown';
import { atomUserOffSession } from '@states/users';
import { UserSessionResetEffect } from '@states/users/userSessionResetEffect';
import { classNames, getSessionStorage } from '@states/utils';
import { signIn } from 'next-auth/react';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

export const HeaderUser = () => {
  const isSession = useRecoilValue(atomUserOffSession);
  const session = getSessionStorage(STORAGE_KEY['offSession']);

  return (
    <Fragment>
      <UserSessionResetEffect />
      {!session && !isSession ? (
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
