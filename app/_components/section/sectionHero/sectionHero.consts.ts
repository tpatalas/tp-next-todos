import { TypesImageWithRemotePlaceholder } from '@/_components/next/imageWithRemotePlaceholder/imageWithRemotePlaceholder.types';
import { PATH_IMAGE } from '@/_lib/consts/assertion.consts';

export const optionsSectionHeroWithImage: TypesImageWithRemotePlaceholder = {
  width: 961,
  height: 754,
  className: 'h-auto w-auto rounded-2xl ring-2 ring-slate-300/20 drop-shadow-2xl will-change-transform',
  src: PATH_IMAGE['demo'],
  sizes: '90vw',
  alt: 'demo application image',
  // placeholder: 'blur',
  priority: true,
};
