'use client';

import { PropsSignInButton } from '../button.types';
import { ButtonWithTooltip } from '../buttonWithTooltip';
import { signIn } from 'next-auth/react';

export const SignInButton = ({ configs = {} }: PropsSignInButton) => {
  const { buttonName } = configs;

  return (
    <ButtonWithTooltip
      configs={configs}
      onClick={() => signIn()}
    >
      {buttonName}
    </ButtonWithTooltip>
  );
};
