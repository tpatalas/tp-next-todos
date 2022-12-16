import { CATCH_MODAL, BREAKPOINT } from '@data/stateObjects';
import { Todos, Types } from '@lib/types';
import { CustomEditor } from '@lib/types/typesSlate';
import { isMacOs } from 'react-device-detect';
import { useRecoilCallback, RecoilValue } from 'recoil';
import { Transforms } from 'slate';
import { atomQueryTodoItem, atomQueryTodoIds } from './atomQuries';
import { atomOnFocus, atomCurrentFocus, atomOnBlur } from './focusStates';
import { atomMediaQuery } from './miscStates';
import {
  atomTodoModalOpen,
  useModalStateOpen,
  atomTodoModalMini,
  useModalStateExpand,
  useModalStateExitMinimize,
  useModalStateMinimize,
  useModalStateMaximize,
  atomConfirmModalDiscard,
} from './modalStates';
import {
  useTodoStateComplete,
  useTodoStateRemove,
  useTodoStateAdd,
  useTodoStateUpdate,
} from './todoStates';
import { atomCatch } from './utilsStates';

export const useItemModalWithKey = (_id: Todos['_id']) => {
  const completeTodo = useTodoStateComplete(_id);
  const removeTodo = useTodoStateRemove(_id);

  const itemModalKeyHandler = useRecoilCallback(({ snapshot }) => (event: KeyboardEvent) => {
    const metaCtrlKey = isMacOs ? event.metaKey : event.ctrlKey;
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (typeof _id === 'undefined' || !get(atomTodoModalOpen(_id))) return;

    switch (true) {
      case metaCtrlKey && event.key === 'Enter':
        event.preventDefault();
        completeTodo();
        break;
      case metaCtrlKey && event.key === 'Backspace':
        event.preventDefault();
        removeTodo();
        break;
    }
  });
  return itemModalKeyHandler;
};

export const useKeyWithFocus = (_id: Todos['_id']) => {
  const completeTodo = useTodoStateComplete(_id);
  const openModal = useModalStateOpen(_id);
  const removeTodo = useTodoStateRemove(_id);
  const focusKeyHandler = useRecoilCallback(
    ({ set, reset, snapshot }) =>
      (event: React.KeyboardEvent) => {
        const metaCtrlKey = isMacOs ? event.metaKey : event.ctrlKey;
        const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

        if (!get(atomOnFocus)) return;

        switch (true) {
          case metaCtrlKey && event.key === 'Enter':
            event.preventDefault();
            completeTodo();
            break;
          case metaCtrlKey && event.key === 'Backspace':
            event.preventDefault();
            removeTodo();
            break;
          case event.key === 'Enter':
            event.preventDefault();
            openModal();
            break;
          case event.key === 'Escape':
            event.preventDefault();
            if (get(atomQueryTodoItem(_id)).completed && get(atomTodoModalOpen(_id))) return;
            !get(atomTodoModalMini(_id)) && reset(atomOnFocus);
            reset(atomCurrentFocus);
            set(atomOnBlur, true);
            break;
        }
      },
  );
  return focusKeyHandler;
};

export const useKeyWithEditor = (
  titleName: Types['titleName'],
  _id: Todos['_id'],
  editor: CustomEditor,
) => {
  const addTodo = useTodoStateAdd();
  const updateTodo = useTodoStateUpdate(_id);
  const editorKeyHandler = useRecoilCallback(() => (event: React.KeyboardEvent) => {
    if (!event) return;
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
  });
  return editorKeyHandler;
};

export const useKeyWithNavigate = () => {
  const keyDownNavigate = useRecoilCallback(({ set, snapshot }) => (event: KeyboardEvent) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (get(atomCatch(CATCH_MODAL.todoModal)) || get(atomCatch(CATCH_MODAL.confirmModal))) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        set(
          atomCurrentFocus,
          get(atomCurrentFocus) === get(atomQueryTodoIds).length - 1
            ? get(atomQueryTodoIds).length - 1
            : get(atomCurrentFocus) + 1,
        );
        !get(atomOnFocus) && set(atomOnFocus, true);
        break;
      case 'ArrowUp':
        event.preventDefault();
        set(
          atomCurrentFocus,
          get(atomCurrentFocus) === 0
            ? 0
            : get(atomCurrentFocus) === -1
            ? get(atomQueryTodoIds).length - 1
            : get(atomCurrentFocus) - 1,
        );
        !get(atomOnFocus) && set(atomOnFocus, true);
        break;
    }
  });
  return keyDownNavigate;
};

export const useKeyWithTodoModal = (_id: Todos['_id']) => {
  const openModal = useModalStateOpen(_id);
  const expandModal = useModalStateExpand(_id);
  const exitMinimizeModal = useModalStateExitMinimize(_id);
  const minimizeModal = useModalStateMinimize(_id);
  const maximizeModal = useModalStateMaximize(_id);
  const keyDownTodoModal = useRecoilCallback(({ snapshot }) => (event: KeyboardEvent) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const metaCtrlKey = isMacOs ? event.metaKey : event.ctrlKey;

    switch (true) {
      case event.key === 't' || event.key === 'T':
        if (
          get(atomCatch(CATCH_MODAL.todoModal)) ||
          get(atomCatch(CATCH_MODAL.minimizedModal)) ||
          get(atomCatch(CATCH_MODAL.confirmModal))
        )
          return;
        typeof _id === 'undefined' && openModal();
        break;
      case !get(atomMediaQuery(BREAKPOINT['sm'])) || get(atomConfirmModalDiscard(_id)):
        break;
      case metaCtrlKey && event.key === 'm':
        event.preventDefault();
        if (typeof _id !== 'undefined') return;
        get(atomTodoModalOpen(_id)) && minimizeModal();
        get(atomTodoModalMini(_id)) && exitMinimizeModal();
        break;
      case metaCtrlKey && event.key === 'e':
        event.preventDefault();
        get(atomTodoModalOpen(_id)) && expandModal();
        get(atomTodoModalMini(_id)) && maximizeModal();
        break;
    }
  });
  return keyDownTodoModal;
};
