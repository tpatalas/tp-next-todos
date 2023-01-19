import { renderPlaceholder, renderCustomElement } from '@lib/editors';
import { Types } from '@lib/types';
import { EditorAutoFocusEffect } from '@states/editors/editorAutoFocusEffect';
import { useEditorInitialValue, useEditorChangeHandler } from '@states/editors/hooks';
import { useKeyWithEditor } from '@states/keybinds/hooks';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  withReact,
  RenderPlaceholderProps,
  RenderElementProps,
  Slate,
  Editable,
} from 'slate-react';

type Props = Pick<Types, 'titleName' | 'placeholder'> & Partial<Pick<Types, 'autoFocus' | 'todo'>>;

export const EditorComposer = ({ autoFocus, todo, titleName, ...props }: Props) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const editorKeyHandler = useKeyWithEditor(titleName, todo?._id, editor);
  const initialValue = useEditorInitialValue(todo?._id, titleName);
  const changeHandler = useEditorChangeHandler(todo?._id, titleName);
  const renderPlaceholderWithProps = (props: RenderPlaceholderProps) =>
    renderPlaceholder({ titleName: titleName, ...props });
  const completed =
    typeof todo !== 'undefined' && useRecoilValue(atomQueryTodoItem(todo?._id)).completed;
  const renderCustomElementWithProps = (props: RenderElementProps) =>
    renderCustomElement({
      titleName: titleName,
      completed: completed,
      ...props,
    });

  return (
    <Slate
      editor={editor}
      value={initialValue()}
      onChange={changeHandler}>
      <Editable
        placeholder={props.placeholder}
        readOnly={completed ? true : false}
        renderPlaceholder={renderPlaceholderWithProps}
        renderElement={renderCustomElementWithProps}
        onKeyDown={editorKeyHandler}
      />
      <EditorAutoFocusEffect
        editor={editor}
        autoFocus={autoFocus as boolean}
      />
    </Slate>
  );
};
