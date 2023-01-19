import { NOTIFICATION, CATCH_MODAL } from '@data/stateObjects';
import {
  createDataNewLabel,
  updateDataLabelItem,
  deleteDataLabelItem,
} from '@lib/queries/queryLabels';
import { Types, Labels } from '@lib/types';
import { atomLabelModalOpen, atomConfirmModalDelete } from '@states/modals';
import { useNotificationState } from '@states/notifications/hooks';
import { atomCatch } from '@states/utils';
import ObjectID from 'bson-objectid';
import { useRecoilCallback, RecoilValue } from 'recoil';
import { atomSelectorLabelItem, atomLabelNew, atomQueryLabels } from '.';

/**
 * Hooks
 **/
export const useLabelValueUpdate = (label?: Types['label']) => {
  return useRecoilCallback(({ set }) => (content: string) => {
    typeof label !== 'undefined'
      ? set(atomSelectorLabelItem(label._id), {
          name: content,
        })
      : set(atomLabelNew, {
          name: content,
          _id: ObjectID().toHexString(),
        });
  });
};

export const useLabelStateAdd = () => {
  const setNotification = useNotificationState();

  return useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomQueryLabels, [
      ...get(atomQueryLabels),
      { _id: get(atomLabelNew)._id, name: get(atomLabelNew).name },
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
