import { atomSelectorTodoItem, atomTodoNew } from '@states/todoStates';
import ObjectID from 'bson-objectid';
import { Todos, TodosEditors, Types } from 'lib/types';
import { atom, RecoilValue, useRecoilCallback } from 'recoil';
import { Descendant, Node } from 'slate';

/**
 * Atoms
 * */
export const atomEditorSerialize = atom({
  key: 'atomEditorSerialize',
  default: (nodes: Descendant[]) => {
    return nodes.map((n) => Node.string(n)).join('\n');
  },
});

export const atomEditorDeserialize = atom({
  key: 'atomEditorDeserialize',
  default: (string: string) => {
    if (typeof string !== 'undefined') {
      return string.split('\n').map((line) => {
        return {
          children: [{ text: line }],
        };
      });
    }
  },
});

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
