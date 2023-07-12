import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { atomFilterSelected } from '@states/comboBoxes';
import { CATCH } from '@constAssertions/misc';
import { atomCatch } from '@states/misc';
import { useLabelUpdateDataItem } from '@label/label.hooks';
import { TypesTodo } from '@components/todos/todos.types';

type Props = Partial<Pick<TypesTodo, 'todo'>>;

export const ComboBoxSelectedLabelsEffect = ({ todo }: Props) => {
  const resetFilter = useResetRecoilState(atomFilterSelected(todo?._id));
  const updateLabelDataUnmount = useLabelUpdateDataItem();
  const setCatchComboBox = useSetRecoilState(atomCatch(CATCH['comboBox']));
  const resetCatchComboBox = useResetRecoilState(atomCatch(CATCH['comboBox']));
  const isTodoModalOpen = useRecoilValue(atomCatch(CATCH['todoModal']));

  useEffect(() => {
    resetFilter();
    setCatchComboBox(true);
    return () => {
      resetCatchComboBox();
      if (isTodoModalOpen) return;
      updateLabelDataUnmount();
    };
    // The updateLabelDataOnMount must not be included within the useEffect's
    // dependencies to run only on unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFilter]);

  return null;
};
