import { TypesOptionsButtonWithTooltip } from '@/button/button.types';
import { TypesImageWithRemotePlaceholder } from '@/components/next/imageWithRemotePlaceholder/imageWithRemotePlaceholder.types';
import { PATH_IMAGE } from '@/lib/consts/assertion.consts';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';

export const optionsSectionHeroWithSignInButton: Partial<TypesOptionsButtonWithTooltip> = {
  signInButtonName: 'Get started',
  className: STYLE_BUTTON_NORMAL_BLUE,
};

export const optionsSectionHeroWithImage: TypesImageWithRemotePlaceholder = {
  width: 961,
  height: 754,
  className: 'h-auto w-auto rounded-2xl ring-2 ring-slate-300/20 drop-shadow-2xl will-change-transform',
  src: PATH_IMAGE['demo'],
  sizes: '90vw',
  alt: 'demo application image',
  placeholder: 'blur',
  priority: true,
};
