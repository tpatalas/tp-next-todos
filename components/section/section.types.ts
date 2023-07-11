import { RefObject } from 'react';

type TypesContentText = 'title' | 'subTitle' | 'content';

export type PropsContentText = Record<TypesContentText, string> & {
  scrollRef: RefObject<HTMLDivElement>;
};
