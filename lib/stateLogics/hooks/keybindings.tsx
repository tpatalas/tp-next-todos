import { CATCH } from '@constAssertions/misc';
import { BREAKPOINT } from '@constAssertions/ui';
import { Labels, Todos } from '@lib/types';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import { atomCurrentFocus, atomOnBlur, atomOnFocus } from '@states/focus';
import { atomCatch } from '@states/misc';
import {
  atomConfirmModalDiscard,
  atomLabelModalOpen,
  atomTodoModalMini,
  atomTodoModalOpen,
} from '@states/modals';
import { isMacOs, isMobile } from 'react-device-detect';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { useLabelAdd, useLabelUpdateDataItem, useLabelUpdateItem } from './labels';
import { useConditionCheckLabelTitleEmpty, useFilterTodoIdsWithPathname } from './misc';
import {
  useTodoModalStateExitMinimize,
  useTodoModalStateExpand,
  useTodoModalStateMaximize,
  useTodoModalStateMinimize,
  useTodoModalStateOpen,
} from './modals';
import { useTodoCompleteItem, useTodoRemoveItem } from './todos';

export const useItemModalWithKey = (_id: Todos['_id']) => {
  const completeTodo = useTodoCompleteItem(_id);
  const removeTodo = useTodoRemoveItem(_id);

  const itemModalKeyHandler = useRecoilCallback(({ snapshot }) => (event: KeyboardEvent) => {
    const metaCtrlKey = isMacOs ? event.metaKey : event.ctrlKey;
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (typeof _id === 'undefined' || !get(atomTodoModalOpen(_id)) || isMobile) return;

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
  const completeTodo = useTodoCompleteItem(_id);
  const openModal = useTodoModalStateOpen(_id);
  const removeTodo = useTodoRemoveItem(_id);
  const focusKeyHandler = useRecoilCallback(({ set, reset, snapshot }) => (event: React.KeyboardEvent) => {
    const metaCtrlKey = isMacOs ? event.metaKey : event.ctrlKey;
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (!get(atomOnFocus) || isMobile) return;

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
        if (get(selectorSessionTodoItem(_id)).completed && get(atomTodoModalOpen(_id))) return;
        event.preventDefault();
        !get(atomTodoModalMini(_id)) && reset(atomOnFocus);
        reset(atomCurrentFocus);
        set(atomOnBlur, true);
        break;
    }
  });
  return focusKeyHandler;
};

// with labels
export const useKeyWithLabelModal = (_id: Labels['_id']) => {
  const titleCheck = useConditionCheckLabelTitleEmpty();
  const isLabelEmpty = typeof _id === 'undefined' && titleCheck;
  const addLabel = useLabelAdd();
  const updateLabel = useLabelUpdateItem(_id);
  return useRecoilCallback(({ snapshot }) => (event: KeyboardEvent) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const isConfirmModalOpen = get(atomCatch(CATCH['confirmModal']));
    const isLabelModalOpen = get(atomCatch(CATCH['labelModal']));

    if (isConfirmModalOpen || !event || isMobile) return;

    switch (event.key) {
      case 'Enter':
        if (!isLabelModalOpen || isLabelEmpty) return;
        event.preventDefault();
        if (get(atomLabelModalOpen(_id)) && typeof _id !== 'undefined') return updateLabel();
        get(atomLabelModalOpen(undefined)) && addLabel();
        return;
      default:
        return;
    }
  });
};

export const useKeyWithLabelDropdown = () => {
  const updateLabelData = useLabelUpdateDataItem();
  return useRecoilCallback(({ snapshot }) => (event: KeyboardEvent) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const isTodoModalOpen = get(atomCatch(CATCH['todoModal']));

    if (isTodoModalOpen || !event || isMobile) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        updateLabelData();
        return;
      default:
        return;
    }
  });
};
// with  Navigate
export const useKeyWithNavigate = () => {
  const filteredTodoIds = useFilterTodoIdsWithPathname();
  const keyDownNavigate = useRecoilCallback(({ set, snapshot }) => (event: KeyboardEvent) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    const catchModals =
      get(atomCatch(CATCH.todoModal)) ||
      get(atomCatch(CATCH.confirmModal)) ||
      get(atomCatch(CATCH.labelModal));
    if (catchModals || isMobile) return;

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

    if (isMobile) return;

    switch (true) {
      case event.key === 't' || event.key === 'T':
        if (
          get(atomCatch(CATCH.todoModal)) ||
          get(atomCatch(CATCH.minimizedModal)) ||
          get(atomCatch(CATCH.confirmModal)) ||
          get(atomCatch(CATCH.labelModal))
        )
          return;
        typeof _id === 'undefined' && openModal();
        break;
      case !get(atomEffectMediaQuery(BREAKPOINT['sm'])) || get(atomConfirmModalDiscard(_id)):
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
