'use client';

import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { classNames } from '@stateLogics/utils';
import { PropsButtonWithTooltip } from '../button.types';
import { ButtonWithTooltip } from '../buttonWithTooltip';
import { signIn } from 'next-auth/react';

export const SignInButton = ({ options = {} }: PropsButtonWithTooltip) => {
  const { signInButtonName = 'Sign in', className, isVisible } = options;
  const optionsButtonWithTooltip = {
    className: classNames('max-ml:w-full', STYLE_BUTTON_NORMAL_BLUE, className ?? 'max-ml:mb-3'),
    tooltip: 'Sign in',
    isVisible,
  };

  return (
    <ButtonWithTooltip
      options={optionsButtonWithTooltip}
      onClick={() => signIn()}
    >
      {signInButtonName}
    </ButtonWithTooltip>
  );
};
