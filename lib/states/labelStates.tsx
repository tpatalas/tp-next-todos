import { NOTIFICATION } from '@data/stateObjects';
import {
  createDataNewLabel,
  deleteDataLabelItem,
  updateDataLabelItem,
} from '@lib/queries/queryLabels';
import { Labels, Types } from '@lib/types';
import ObjectID from 'bson-objectid';
import { atom, atomFamily, RecoilValue, useRecoilCallback, selectorFamily } from 'recoil';
import { atomQueryLabels } from './atomQueries';
import { atomLabelModalOpen } from './modalStates';
import { useNotificationState } from './notificationStates';

/*
 * Atom
 * */
export const atomLabelNew = atom<Labels>({
  key: 'atomLabelNew',
  default: {
    _id: undefined,
    name: '',
    title_id: undefined,
    parent_id: undefined,
  } as Labels,
});

export const atomSelectorLabelItem = atomFamily<Labels, Labels['_id']>({
  key: 'atomSelectorLabelItem',
  default: selectorFamily({
    key: 'selectorLabelItem',
    get:
      (label_id) =>
      ({ get }) =>
        get(atomQueryLabels).find((label) => label._id === label_id)!,
  }),
});

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
  });
};

export const useLabelStateRemove = (_id: Labels['_id']) => {
  const setNotification = useNotificationState();

  return useRecoilCallback(({ snapshot, set }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    const removeLabel = get(atomQueryLabels).filter((label) => label._id !== _id);
    set(atomQueryLabels, removeLabel);
    deleteDataLabelItem(_id);
    setNotification(NOTIFICATION['updatedLabel']);
  });
};
