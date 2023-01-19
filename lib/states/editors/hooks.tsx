import { Todos, Types, TodosEditors } from '@lib/types';
import { atomSelectorTodoItem, atomTodoNew } from '@states/todos';
import ObjectID from 'bson-objectid';
import { useRecoilCallback, RecoilValue } from 'recoil';
import { Descendant } from 'slate';
import { atomEditorDeserialize, atomEditorSerialize } from '.';

/*
 * Hooks
 * */
export const useEditorTodoUpdate = (_id: Todos['_id'], titleName: Types['titleName']) => {
  return useRecoilCallback(({ set, snapshot }) => (content: string) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    typeof _id !== 'undefined'
      ? set(atomSelectorTodoItem(_id), {
          ...get(atomSelectorTodoItem(_id)),
          [titleName]: content,
        }) // Updater
      : set(atomTodoNew, {
          ...get(atomTodoNew),
          [titleName]: content,
          _id: ObjectID().toHexString(),
        }); // Creator
  });
};

export const useEditorInitialValue = (_id: Todos['_id'], titleName: Types['titleName']) => {
  return useRecoilCallback(({ snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    return (get(atomEditorDeserialize)(
      _id === undefined
        ? get(atomTodoNew)[titleName as keyof TodosEditors]
        : get(atomSelectorTodoItem(_id))[titleName as keyof TodosEditors],
    ) || [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ]) as Descendant[];
  });
};

export const useEditorChangeHandler = (_id: Todos['_id'], titleName: Types['titleName']) => {
  const createEditor = useEditorTodoUpdate(undefined, titleName);
  const updateEditor = useEditorTodoUpdate(_id, titleName);
  const editorState = useRecoilCallback(({ snapshot }) => (value: Descendant[]) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const content = get(atomEditorSerialize)(value).trim();
    _id === undefined
      ? createEditor(content) // create Editor
      : updateEditor(content); // update Editor
  });
  return editorState;
};
