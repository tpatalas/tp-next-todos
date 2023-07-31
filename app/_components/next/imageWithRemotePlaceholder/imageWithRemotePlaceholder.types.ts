import { TypesNextImage } from '../next.types';

export type TypesImageWithRemotePlaceholder = Pick<TypesNextImage, 'src' | 'width' | 'height' | 'alt'> &
  Partial<Omit<TypesNextImage, 'src' | 'width' | 'height' | 'alt'>>;

export type PropsImageWithRemotePlaceholder = { options: TypesImageWithRemotePlaceholder };
