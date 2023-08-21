import { PATH_IMAGE } from '@/_lib/consts/assertion.consts';
import { CSSProperties } from 'react';

export interface TypesNextImage {
  width: number;
  height: number;
  className: string;
  src: PATH_IMAGE;
  alt: string;
  sizes: string;
  quality: number;
  placeholder: 'blur' | 'empty';
  blurDataURL: string;
  priority: boolean;
  fill: boolean;
  style: CSSProperties;
  loading: 'eager' | 'lazy';
}
