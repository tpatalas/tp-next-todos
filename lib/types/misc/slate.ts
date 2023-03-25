/**
 * Types slate.js
 */

import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

type ElementTypes = { type: 'paragraph'; children: CustomText[] } | { type: 'code'; children: CustomText[] };

type CustomElement = Pick<ElementTypes, 'children'> & Partial<Pick<ElementTypes, 'type'>>;

type CustomText = { text: string };

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Texts: CustomText;
  }
}
