import { Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { CustomEditor } from '@lib/types/misc/slate';
import { TypesTodo } from '@components/todos/todos.types';

export type TypesPropsEditorComposer = Pick<TypesEditor, 'titleName' | 'placeholder'> &
  Partial<Pick<TypesEditor, 'isAutoFocus'> & Pick<TypesTodo, 'todo'>>;

export type TypesPropsAuthFocusEffect = Pick<TypesEditor, 'isAutoFocus'> & { editor: CustomEditor };

export interface TypesEditor {
  titleName: string;
  isAutoFocus: boolean;
  placeholder: string;
  initialValue: Descendant[];
  changeHandler: (value: Descendant[]) => void;
  editor: ReactEditor;
}
