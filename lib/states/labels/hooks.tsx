import { NOTIFICATION, CATCH } from '@data/dataTypesConst';
import { STYLE_COLORS } from '@data/stylePreset';
import {
  createDataNewLabel,
  deleteDataLabelItem,
  updateDataLabelItem,
  updateDataLabels,
} from '@lib/queries/queryLabels';
import { Labels, Todos, Types } from '@lib/types';
import { atomConfirmModalDelete, atomLabelModalOpen } from '@states/modals';
import { useNotificationState } from '@states/notifications/hooks';
import { atomTodoNew } from '@states/todos';
import { atomSelectorTodoItem } from '@states/todos/atomQueries';
import { atomCatch } from '@states/utils';
import { useCompareToQueryLabels, useGetWithRecoilCallback } from '@states/utils/hooks';
import ObjectID from 'bson-objectid';
import { useSession } from 'next-auth/react';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { atomLabelNew, atomSelectorLabelItem } from '.';
import { atomQueryLabels, atomSelectorLabels } from './atomQueries';

/**
 * Hooks
 **/
export const useLabelValueUpdate = (label?: Types['label']) => {
  return useRecoilCallback(({ set }) => (content: string) => {
    const randomBgColor = STYLE_COLORS[Math.floor(Math.random() * STYLE_COLORS.length)];
    typeof label !== 'undefined'
      ? set(atomSelectorLabelItem(label._id), {
          name: content,
        })
      : set(atomLabelNew, {
          name: content,
          _id: ObjectID().toHexString(),
          color: randomBgColor,
        });
  });
};

export const useLabelAdd = () => {
  const { status } = useSession();
  const setNotification = useNotificationState();

  return useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomSelectorLabels, [...get(atomSelectorLabels), { ...get(atomLabelNew) }]);
    set(atomQueryLabels, [...get(atomQueryLabels), { ...get(atomLabelNew) }]);

    status === 'authenticated' && createDataNewLabel(get(atomLabelNew));
    reset(atomLabelNew);
    reset(atomLabelModalOpen(undefined));
    setNotification(NOTIFICATION['createdLabel']);
    get(atomCatch(CATCH.labelModal)) && reset(atomCatch(CATCH.labelModal));
  });
};

export const useLabelUpdateItem = (_id: Labels['_id']) => {
  const { status } = useSession();
  const setNotification = useNotificationState();

  return useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    const updateLabels = get(atomQueryLabels).map((label) => ({
      ...label,
      name: label._id === _id ? get(atomSelectorLabelItem(label._id)).name : label.name,
    }));

    set(atomQueryLabels, updateLabels);
    status === 'authenticated' && updateDataLabelItem(_id, get(atomSelectorLabelItem(_id)));

    reset(atomLabelModalOpen(_id));
    setNotification(NOTIFICATION['updatedLabel']);
    get(atomCatch(CATCH.labelModal)) && reset(atomCatch(CATCH.labelModal));
  });
};

export const useLabelRemoveItem = (_id: Labels['_id']) => {
  const { status } = useSession();
  const setNotification = useNotificationState();

  return useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (!get(atomConfirmModalDelete(_id))) {
      set(atomConfirmModalDelete(_id), true);
      !get(atomCatch(CATCH.confirmModal)) && set(atomCatch(CATCH.confirmModal), true);
      return;
    }

    const removeLabel = get(atomSelectorLabels).filter((label) => label._id !== _id);
    set(atomQueryLabels, removeLabel);
    status === 'authenticated' && deleteDataLabelItem(_id);
    setNotification(NOTIFICATION['deleteLabel']);
    get(atomCatch(CATCH.labelModal)) && reset(atomCatch(CATCH.labelModal));
  });
};

export const useLabelRemoveItemTitleId = (_id: Todos['_id']) => {
  const updateLabels = useLabelUpdateDataItem();
  const get = useGetWithRecoilCallback();

  const removeLabelItemTitleId = useRecoilCallback(({ snapshot, set }) => (labelId: Labels['_id']) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const todoId = _id ? _id! : get(atomTodoNew)._id!;

    const filteredLabelsRemoved = get(atomSelectorLabels).map((label) => {
      const labelIdMatched = label._id === labelId;
      const unFilteredLabelTitleIds = label.title_id && label.title_id;
      const filteredLabelTitleIds = label.title_id && label.title_id.filter((titleId) => titleId !== todoId);

      return {
        ...label,
        title_id: labelIdMatched ? filteredLabelTitleIds : unFilteredLabelTitleIds,
      };
    });
    set(atomSelectorLabels, filteredLabelsRemoved);

    typeof _id === 'undefined'
      ? set(atomTodoNew, {
          ...get(atomTodoNew),
          labelItem: filteredLabelsRemoved,
        })
      : set(atomSelectorTodoItem(todoId), {
          ...get(atomSelectorTodoItem(todoId)),
          labelItem: filteredLabelsRemoved,
        });
  });

  return (labelId: Labels['_id']) => {
    removeLabelItemTitleId(labelId);
    !get(atomCatch(CATCH.todoModal)) && updateLabels();
  };
};

export const useLabelUpdateDataItem = () => {
  const { status } = useSession();
  const compareLabelsToQueryLabel = useCompareToQueryLabels();
  return useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const updatedLabels = get(atomSelectorLabels);
    const filteredLabels = compareLabelsToQueryLabel(get(atomSelectorLabels));

    set(atomQueryLabels, updatedLabels);
    if (filteredLabels.length === 0) return;
    status === 'authenticated' && updateDataLabels(filteredLabels);
    reset(atomSelectorLabels);
  });
};

export const useLabelChangeHandler = (_id: Todos['_id']) => {
  const compareLabelsToQueryLabel = useCompareToQueryLabels();
  return useRecoilCallback(({ set, snapshot }) => (selected: Labels[]) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const todoId = _id ? _id! : get(atomTodoNew)._id!;
    const labels = get(atomQueryLabels);
    const isTodoModalOpen = get(atomCatch(CATCH['todoModal']));

    const labelsUpdatedChanges = [...labels].map((label) => {
      const labelItem = selected.filter((select) => select._id === label._id)[0];
      const isTodoIdExist = label.title_id && label.title_id.includes(todoId);
      const addOrCreateTodoId = label.title_id ? [...label.title_id, todoId] : [todoId];
      const updateTitleId = () => {
        if (!labelItem?._id) return label;
        return {
          ...label,
          title_id: !isTodoIdExist ? addOrCreateTodoId : label.title_id,
        };
      };
      const removeTitleId = () => {
        if (labelItem?._id) return label;
        return {
          ...label,
          title_id: label.title_id && label.title_id.filter((titleId) => titleId !== todoId),
        };
      };
      return isTodoIdExist ? removeTitleId() : updateTitleId();
    });
    const filteredLabelsUpdatedChanges = compareLabelsToQueryLabel(labelsUpdatedChanges);

    set(atomSelectorLabels, labelsUpdatedChanges);
    if (!isTodoModalOpen) return;
    typeof _id === 'undefined'
      ? set(atomTodoNew, {
          ...get(atomTodoNew),
          labelItem: filteredLabelsUpdatedChanges,
        })
      : set(atomSelectorTodoItem(todoId), {
          ...get(atomSelectorTodoItem(todoId)),
          labelItem: filteredLabelsUpdatedChanges,
        });
  });
};
