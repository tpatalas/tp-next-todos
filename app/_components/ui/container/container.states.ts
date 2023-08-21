import { PrimitiveAtom, atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { RefObject } from 'react';
import { TypesContainer } from './container.types';

export const atomDivRef = atomFamily<TypesContainer['_id'], PrimitiveAtom<RefObject<HTMLDivElement> | null>>(
  () => atom<RefObject<HTMLDivElement> | null>(null),
);

// remove the atom from the cache by removing params after one expiration
const expiration = 3600000; // one hour

atomDivRef.setShouldRemove((createdAt) => Date.now() - createdAt > expiration);
