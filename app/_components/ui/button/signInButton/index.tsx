'use client';

import { PropsButtonWithTooltip } from '../button.types';
import { ButtonWithTooltip } from '../buttonWithTooltip';
import { signIn } from 'next-auth/react';

export const SignInButton = ({ configsButton = {}, configsTooltip }: PropsButtonWithTooltip) => {
  const { buttonName } = configsButton;

  return (
    <ButtonWithTooltip
      configsButton={configsButton}
      configsTooltip={configsTooltip}
      onClick={() => signIn()}
    >
      {buttonName}
    </ButtonWithTooltip>
  );
};
