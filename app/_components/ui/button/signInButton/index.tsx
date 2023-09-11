'use client';

import { PropsButtonWithTooltip } from '../button.types';
import { ButtonWithTooltip } from '../buttonWithTooltip';
import { signIn } from 'next-auth/react';

export const SignInButton = ({ configs = {}, children }: PropsButtonWithTooltip) => {
  const { buttonName } = configs;

  return (
    <ButtonWithTooltip
      configs={configs}
      onClick={() => signIn()}
    >
      {!!buttonName ? buttonName : children}
    </ButtonWithTooltip>
  );
};
