import { TypesButton } from '@/button/button.types';
import { PropsSvgIcon } from '@/icon/icon.types';
import { ReactNode } from 'react';

export type PropsIconButtonContent = Partial<
  { children: ReactNode; extraContent: ReactNode } & TypesButton & PropsSvgIcon
>;
