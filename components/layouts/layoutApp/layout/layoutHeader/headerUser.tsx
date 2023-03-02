import { Button } from '@buttons/button';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { UserDropdown } from '@dropdowns/v2/userDropdown';
import { atomIDBUserSession } from '@states/users';
import { UserSessionEffect } from '@states/users/userSessionEffect';
import { classNames } from '@states/utils';
import { signIn } from 'next-auth/react';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

export const HeaderUser = () => {
  const isSession = useRecoilValue(atomIDBUserSession);

  return (
    <Fragment>
      <UserSessionEffect />
      {isSession ? (
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
