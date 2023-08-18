import { ReactNode, RefObject } from 'react';
import { TypesContainer } from '@/container/container.types';
import { ConfigsProps } from '@/_lib/utils/configs.utils';
import { configsTransition } from './transition.configs';

export type PropsSmoothTransition = {
  children: ReactNode;
  configs: Partial<ConfigsProps<typeof configsTransition>>;
} & Partial<{ scrollRef: RefObject<HTMLElement> | null }>;

export type PropsSmoothTransitionWithDivRef = Omit<PropsSmoothTransition, 'scrollRef'> & Pick<TypesContainer, '_id'>;
