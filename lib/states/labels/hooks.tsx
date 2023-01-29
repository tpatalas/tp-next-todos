import { CATCH, NOTIFICATION } from '@data/dataTypesObjects';
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
import { atomCatch } from '@states/utils';
import { useGetWithRecoilCallback } from '@states/utils/hooks';
import ObjectID from 'bson-objectid';
import equal from 'fast-deep-equal/react';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { atomLabelNew, atomQueryLabels, atomSelectorLabelItem, atomSelectorLabels } from '.';

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
  const setNotification = useNotificationState();

  return useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomQueryLabels, [
      ...get(atomQueryLabels),
      { _id: get(atomLabelNew)._id, name: get(atomLabelNew).name, color: get(atomLabelNew).color },
    ]);
    createDataNewLabel(get(atomLabelNew));
    reset(atomLabelNew);
    reset(atomLabelModalOpen(undefined));
    setNotification(NOTIFICATION['createdLabel']);
    get(atomCatch(CATCH.labelModal)) && reset(atomCatch(CATCH.labelModal));
  });
};

export const useLabelUpdateItem = (_id: Labels['_id']) => {
  const setNotification = useNotificationState();

  return useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    const updateLabels = get(atomQueryLabels).map((label) => ({
      ...label,
      name: label._id === _id ? get(atomSelectorLabelItem(label._id)).name : label.name,
    }));

    set(atomQueryLabels, updateLabels);
    updateDataLabelItem(_id, get(atomSelectorLabelItem(_id)));
    reset(atomLabelModalOpen(_id));
    setNotification(NOTIFICATION['updatedLabel']);
    get(atomCatch(CATCH.labelModal)) && reset(atomCatch(CATCH.labelModal));
  });
};

export const useLabelRemoveItem = (_id: Labels['_id']) => {
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
    deleteDataLabelItem(_id);
    setNotification(NOTIFICATION['deleteLabel']);
    get(atomCatch(CATCH.labelModal)) && reset(atomCatch(CATCH.labelModal));
  });
};

export const useLabelRemoveItemTitleId = (_id: Todos['_id']) => {
  const updateDataLabels = useLabelUpdateDataItem();
  const get = useGetWithRecoilCallback();
  const removeLabelItemTitleId = useRecoilCallback(
    ({ snapshot, set }) =>
      (labelId: Labels['_id']) => {
        const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
        const todoId = _id ? _id! : get(atomTodoNew)._id!;

        const filteredLabelsRemoved = get(atomSelectorLabels).map((label) => {
          const labelIdMatched = label._id === labelId;
          const unFilteredLabelTitleIds = label.title_id && label.title_id;
          const filteredLabelTitleIds =
            label.title_id && label.title_id.filter((titleId) => titleId !== todoId);

          return {
            ...label,
            title_id: labelIdMatched ? filteredLabelTitleIds : unFilteredLabelTitleIds,
          };
        });
        set(atomSelectorLabels, filteredLabelsRemoved);
      },
  );
  return (labelId: Labels['_id']) => {
    removeLabelItemTitleId(labelId);
    !get(atomCatch(CATCH.todoModal)) && updateDataLabels();
  };
};

export const useLabelUpdateDataItem = () => {
  return useRecoilCallback(({ snapshot, set }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const updatedLabels = get(atomSelectorLabels);
    const filteredLabels = get(atomSelectorLabels).filter((label) => {
      return !get(atomQueryLabels).find((queriedLabel) => equal(label, queriedLabel));
    });

    set(atomQueryLabels, updatedLabels);
    if (filteredLabels.length === 0) return;
    updateDataLabels(filteredLabels);
  });
};

export const useLabelChangeHandler = (_id: Todos['_id']) => {
  return useRecoilCallback(({ set, snapshot }) => (selected: Labels[]) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const todoNew = get(atomTodoNew);
    const todoId = _id ? _id! : todoNew._id!;
    const labels = get(atomQueryLabels);

    const labelsUpdateChange = [...labels].map((label) => {
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
    set(atomSelectorLabels, labelsUpdateChange);
  });
};
