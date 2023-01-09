import { NOTIFICATION } from '@data/stateObjects';
import { createDataNewLabel } from '@lib/queries/queryLabels';
import { Labels } from '@lib/types';
import { atom, atomFamily, RecoilValue, useRecoilCallback } from 'recoil';
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

export const atomLabelItem = atomFamily<Labels, Labels['_id']>({
  key: 'atomLabelItem',
});

/**
 * Hooks
 **/
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
