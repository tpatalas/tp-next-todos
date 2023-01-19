import { CATCH_MODAL, BREAKPOINT } from '@data/stateObjects';
import { Todos, Types, Labels } from '@lib/types';
import { CustomEditor } from '@lib/types/typesSlate';
import { atomOnFocus, atomCurrentFocus, atomOnBlur } from '@states/focus/states';
import { useLabelStateAdd, useLabelStateUpdate } from '@states/labels/hooks';
import { atomMediaQuery } from '@states/misc/states';
import {
  useTodoModalStateOpen,
  useTodoModalStateExpand,
  useTodoModalStateExitMinimize,
  useTodoModalStateMinimize,
  useTodoModalStateMaximize,
} from '@states/modals/hooks';
import {
  atomTodoModalOpen,
  atomTodoModalMini,
  atomLabelModalOpen,
  atomConfirmModalDiscard,
} from '@states/modals/states';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import {
  useTodoStateComplete,
  useTodoStateRemove,
  useTodoStateAdd,
  useTodoStateUpdate,
  useFilterTodoIdsWithPathname,
} from '@states/todos/hooks';
import { atomCatch } from '@states/utils/states';
import { isMacOs } from 'react-device-detect';
import { useRecoilCallback, RecoilValue } from 'recoil';
import { Transforms } from 'slate';

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
  const openModal = useTodoModalStateOpen(_id);
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

export const useKeyWithLabelModal = (_id: Labels['_id']) => {
  const addLabel = useLabelStateAdd();
  const updateLabel = useLabelStateUpdate(_id);
  return useRecoilCallback(({ snapshot }) => (event: KeyboardEvent) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (get(atomCatch(CATCH_MODAL.todoModal)) || get(atomCatch(CATCH_MODAL.confirmModal))) return;

    if (!event) return;
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (get(atomLabelModalOpen(_id)) && typeof _id !== 'undefined') return updateLabel();
        get(atomLabelModalOpen(undefined)) && addLabel();
        return;
      default:
        return;
    }
  });
};

export const useKeyWithNavigate = () => {
  const filteredTodoIds = useFilterTodoIdsWithPathname();
  const keyDownNavigate = useRecoilCallback(({ set, snapshot }) => (event: KeyboardEvent) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (
      get(atomCatch(CATCH_MODAL.todoModal)) ||
      get(atomCatch(CATCH_MODAL.confirmModal)) ||
      get(atomCatch(CATCH_MODAL.labelModal))
    )
      return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        set(
          atomCurrentFocus,
          get(atomCurrentFocus) === filteredTodoIds.length - 1
            ? filteredTodoIds.length - 1
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
            ? filteredTodoIds.length - 1
            : get(atomCurrentFocus) - 1,
        );
        !get(atomOnFocus) && set(atomOnFocus, true);
        break;
    }
  });
  return keyDownNavigate;
};

export const useKeyWithTodoModal = (_id: Todos['_id']) => {
  const openModal = useTodoModalStateOpen(_id);
  const expandModal = useTodoModalStateExpand(_id);
  const exitMinimizeModal = useTodoModalStateExitMinimize(_id);
  const minimizeModal = useTodoModalStateMinimize(_id);
  const maximizeModal = useTodoModalStateMaximize(_id);
  const keyDownTodoModal = useRecoilCallback(({ snapshot }) => (event: KeyboardEvent) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const metaCtrlKey = isMacOs ? event.metaKey : event.ctrlKey;

    switch (true) {
      case event.key === 't' || event.key === 'T':
        if (
          get(atomCatch(CATCH_MODAL.todoModal)) ||
          get(atomCatch(CATCH_MODAL.minimizedModal)) ||
          get(atomCatch(CATCH_MODAL.confirmModal)) ||
          get(atomCatch(CATCH_MODAL.labelModal))
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
