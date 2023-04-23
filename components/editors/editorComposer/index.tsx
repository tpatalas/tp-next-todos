import { EditorAutoFocusEffect } from '@effects/editorAutoFocusEffect';
import { useEditorChangeHandler, useEditorInitialValue } from '@hooks/editors';
import { useKeyWithEditor } from '@hooks/keybindings';
import { renderCustomElement, renderPlaceholder } from '@lib/editors';
import { Types } from '@lib/types';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import { useMemo } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, RenderElementProps, RenderPlaceholderProps, Slate, withReact } from 'slate-react';

type Props = Pick<Types, 'titleName' | 'placeholder'> & Partial<Pick<Types, 'isAutoFocus' | 'todo'>>;

export const EditorComposer = ({ isAutoFocus, todo, titleName, ...props }: Props) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const editorKeyHandler = useKeyWithEditor(titleName, todo?._id, editor);
  const initialValue = useEditorInitialValue(todo?._id, titleName);
  const changeHandler = useEditorChangeHandler(todo?._id, titleName);
  const renderPlaceholderWithProps = (props: RenderPlaceholderProps) =>
    renderPlaceholder({ titleName: titleName, ...props });
  const todoItem = useRecoilValueLoadable(selectorSessionTodoItem(todo?._id)).valueMaybe();
  const todoCompleted = todoItem?.completed;
  const completed = typeof todo !== 'undefined' && todoCompleted;
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
      onChange={changeHandler}
    >
      <Editable
        placeholder={props.placeholder}
        readOnly={completed ? true : false}
        renderPlaceholder={renderPlaceholderWithProps}
        renderElement={renderCustomElementWithProps}
        onKeyDown={editorKeyHandler}
      />
      <EditorAutoFocusEffect
        editor={editor}
        isAutoFocus={isAutoFocus as boolean}
      />
    </Slate>
  );
};
