import { atomTodoNew } from '@components/todos/todos.states';
import { TypesTodos, TypesTodosEditors } from '@components/todos/todos.types';
import { TypesEditor } from '@editor/editor.types';
import { useTodoAdd, useTodoUpdateItem } from '@hooks/todos';
import { CustomEditor } from '@lib/types/misc/slate';
import { atomSelectorTodoItem } from '@states/atomEffects/todos';
import { atomEditorDeserialize, atomEditorSerialize } from '@states/editors';
import { isMobile } from 'react-device-detect';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { Descendant, Transforms } from 'slate';

export const useEditorTodoUpdate = (_id: TypesTodos['_id'], titleName: TypesEditor['titleName']) => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (content: string) => {
        const get = <T>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

        typeof _id !== 'undefined'
          ? set(atomSelectorTodoItem(_id), {
              ...get(atomSelectorTodoItem(_id)),
              [titleName]: content,
            }) // Updater
          : set(atomTodoNew, {
              ...get(atomTodoNew),
              [titleName]: content,
            }); // Creator
      },
    [_id, titleName],
  );
};

export const useEditorInitialValue = (_id: TypesTodos['_id'], titleName: TypesEditor['titleName']) => {
  return useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const get = <T>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

        return (get(atomEditorDeserialize)(
          _id === undefined
            ? get(atomTodoNew)[titleName as keyof TypesTodosEditors]
            : get(atomSelectorTodoItem(_id))[titleName as keyof TypesTodosEditors],
        ) || [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ]) as Descendant[];
      },
    [_id, titleName],
  );
};

export const useEditorChangeHandler = (_id: TypesTodos['_id'], titleName: TypesEditor['titleName']) => {
  const createEditor = useEditorTodoUpdate(undefined, titleName);
  const updateEditor = useEditorTodoUpdate(_id, titleName);
  const editorState = useRecoilCallback(
    ({ snapshot }) =>
      (value: Descendant[]) => {
        const get = <T>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
        const content = get(atomEditorSerialize)(value).trim();
        _id === undefined
          ? createEditor(content) // create Editor
          : updateEditor(content); // update Editor
      },
    [_id, createEditor, updateEditor],
  );
  return editorState;
};

export const useKeyWithEditor = (
  titleName: TypesEditor['titleName'],
  _id: TypesTodos['_id'],
  editor: CustomEditor,
) => {
  const addTodo = useTodoAdd();
  const updateTodo = useTodoUpdateItem(_id);
  const editorKeyHandler = useRecoilCallback(
    () => (event: React.KeyboardEvent) => {
      if (!event || isMobile) return;

      switch (event.key) {
        case 'Enter':
          if (titleName === 'title') {
            event.preventDefault();
            if (typeof _id === 'undefined') return addTodo();
            updateTodo();
            return;
          }
          if (event.shiftKey) {
            event.preventDefault();
            Transforms.insertNodes(editor, {
              type: 'paragraph',
              children: [{ text: '\n' }],
            });
          }
          break;
        default:
          break;
      }
    },
    [_id, addTodo, editor, titleName, updateTodo],
  );
  return editorKeyHandler;
};
