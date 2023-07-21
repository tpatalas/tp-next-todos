import { atom } from 'jotai';
import { RefObject } from 'react';

export const atomDivRef = atom<RefObject<HTMLDivElement> | null>(null);
