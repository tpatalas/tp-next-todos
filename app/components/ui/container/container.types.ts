import { TypesClassNames } from '@/components/components.types';
import { ReactNode } from 'react';

export type PropsDivContainer = { children: ReactNode } & Partial<Pick<TypesClassNames, 'className'>>;
