import { PATH_APP, PATH_HOME } from '@constAssertions/data';
import { RefObject } from 'react';

export type CollectTypesMisc = TypesRouter & TypesWindow & TypesRefs;

export interface TypesRouter {
  path: string;
  pathname: PATH_APP | PATH_HOME;
  isPrefetchingOnHover: boolean;
}

export interface TypesWindow {
  mediaQueryValue: number;
}

export interface TypesRefs {
  initialFocus: RefObject<HTMLElement | null>;
  divFocus: RefObject<HTMLDivElement>;
  scrollRef: RefObject<HTMLDivElement>;
}
