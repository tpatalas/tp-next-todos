import { TypesTodos } from '@components/todos/todos.types';
import { selectorSelectedLabels } from '@label/label.states';
import { atomFilterSelected, atomComboBoxQuery } from '@states/comboBoxes';
import { RecoilValue, useRecoilCallback } from 'recoil';

export const useSetFilterLabels = (_id: TypesTodos['_id']) => {
  return useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const selectedLabels = get(selectorSelectedLabels(_id));
    const isFilteredOn = get(atomFilterSelected(_id));

    if (selectedLabels.length === 0) return;
    if (isFilteredOn) {
      reset(atomFilterSelected(_id));
      reset(atomComboBoxQuery);
      return;
    }
    set(atomFilterSelected(_id), true);
  });
};
