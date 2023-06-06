import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { classNames } from '@stateLogics/utils';
import { TypesLayout } from './layout.types';

export const optionsSignInButton = (path: TypesLayout['path']) => {
  const layoutHome = path === 'home';
  return {
    className: classNames('max-ml:w-full', STYLE_BUTTON_NORMAL_BLUE, layoutHome && 'max-ml:mb-3'),
    tooltip: 'Sign in',
  };
};
