import { PATHNAME } from '@constAssertions/data';
import { RefObject } from 'react';
import { Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

export type CollectTypesMisc = TypesEditor & TypesRouter & TypesWindow & TypesRefs;

export interface TypesEditor {
  titleName: string;
  isAutoFocus: boolean;
  placeholder: string;
  initialValue: Descendant[];
  changeHandler: (value: Descendant[]) => void;
  editor: ReactEditor;
}

export interface TypesRouter {
  path: string;
  pathname: PATHNAME;
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
