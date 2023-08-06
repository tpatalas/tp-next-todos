import { styleButton } from './button.styles';
import { TypesConfigsButtonWithTooltip, TypesConfigsSignInButton } from './button.types';

export const configsSignInButton: TypesConfigsSignInButton<Partial<TypesConfigsButtonWithTooltip>> = {
  getStarted: {
    signInButtonName: 'Get started',
    className: styleButton({ className: 'max-ml:mb-3' }),
    tooltip: 'Sign in',
  },
  default: {
    signInButtonName: 'Sign in',
    className: styleButton({ className: 'max-ml:mb-3' }),
    tooltip: 'Sign in',
  },
};
