'use client';

import { styleButton } from '../button.styles';
import { PropsSignInButton } from '../button.types';
import { ButtonWithTooltip } from '../buttonWithTooltip';
import { signIn } from 'next-auth/react';

export const SignInButton = ({ configs = {} }: PropsSignInButton) => {
  const { buttonName } = configs;

  return (
    <ButtonWithTooltip
      configs={configs}
      className={styleButton({ className: 'max-ml:mb-3' })}
      onClick={() => signIn()}
    >
      {buttonName}
    </ButtonWithTooltip>
  );
};
