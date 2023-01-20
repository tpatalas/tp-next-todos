import { CATCH_MODAL, NOTIFICATION } from '@data/stateObjects';
import { STYLE_COLORS_BG } from '@data/stylePreset';
import {
  createDataNewLabel,
  deleteDataLabelItem,
  updateDataLabelItem,
} from '@lib/queries/queryLabels';
import { Labels, Todos, Types } from '@lib/types';
import { atomConfirmModalDelete, atomLabelModalOpen } from '@states/modals';
import { useNotificationState } from '@states/notifications/hooks';
import { atomTodoNew } from '@states/todos';
import { atomCatch } from '@states/utils';
import ObjectID from 'bson-objectid';
import { RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';
import { atomLabelNew, atomQueryLabels, atomSelectorLabelItem } from '.';

/**
 * Hooks
 **/
export const useLabelValueUpdate = (label?: Types['label']) => {
  return useRecoilCallback(({ set }) => (content: string) => {
    const randomBgColor = STYLE_COLORS_BG[Math.floor(Math.random() * STYLE_COLORS_BG.length)];
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

export const useLabelStateAdd = () => {
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
    get(atomCatch(CATCH_MODAL.labelModal)) && reset(atomCatch(CATCH_MODAL.labelModal));
  });
};

export const useLabelStateUpdate = (_id: Labels['_id']) => {
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
    get(atomCatch(CATCH_MODAL.labelModal)) && reset(atomCatch(CATCH_MODAL.labelModal));
  });
};

export const useLabelStateRemove = (_id: Labels['_id']) => {
  const setNotification = useNotificationState();

  return useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (!get(atomConfirmModalDelete(_id))) {
      set(atomConfirmModalDelete(_id), true);
      !get(atomCatch(CATCH_MODAL.confirmModal)) && set(atomCatch(CATCH_MODAL.confirmModal), true);
      return;
    }

    const removeLabel = get(atomQueryLabels).filter((label) => label._id !== _id);
    set(atomQueryLabels, removeLabel);
    deleteDataLabelItem(_id);
    setNotification(NOTIFICATION['deleteLabel']);
    get(atomCatch(CATCH_MODAL.labelModal)) && reset(atomCatch(CATCH_MODAL.labelModal));
  });
};

export const useLabelChangeHandler = (_id: Todos['_id']) => {
  const todoNew = useRecoilValue(atomTodoNew);
  const labels = useRecoilValue(atomQueryLabels);
  const todoId = _id ? _id! : todoNew._id!;
  return useRecoilCallback(({ set }) => (selected: Labels[]) => {
    const updateChange = labels.map((label) => {
      const labelId = selected.filter((select) => select._id === label._id)[0]?._id;
      const isTodoIdExist = label.title_id && label.title_id.includes(todoId);
      const addOrCreateTodoId = label.title_id ? [...label.title_id, todoId] : [todoId];
      const updateTitleId = () => {
        if (!labelId) return label;
        return {
          ...label,
          title_id: !isTodoIdExist ? addOrCreateTodoId : label.title_id,
        };
      };
      const removeTitleId = () => {
        if (labelId) return label;
        return {
          ...label,
          title_id: label.title_id && label.title_id.filter((titleId) => titleId !== todoId),
        };
      };
      return isTodoIdExist ? removeTitleId() : updateTitleId();
    });
    set(atomQueryLabels, updateChange);
  });
};
