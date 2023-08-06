'use client';

import { PropsButtonWithTooltip } from '../button.types';
import { ButtonWithTooltip } from '../buttonWithTooltip';
import { signIn } from 'next-auth/react';

export const SignInButton = ({ configs = {} }: PropsButtonWithTooltip) => {
  const { signInButtonName } = configs;

  return (
    <ButtonWithTooltip
      configs={configs}
      onClick={() => signIn()}
    >
      {signInButtonName}
    </ButtonWithTooltip>
  );
};
