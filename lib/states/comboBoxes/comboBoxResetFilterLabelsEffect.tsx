import { Types } from '@lib/types';
import { atomTodoModalOpen } from '@states/modals';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { atomFilterSelected } from '.';

type Props = Partial<Pick<Types, 'todo'>>;

export const ComboBoxResetFilterLabelsEffect = ({ todo }: Props) => {
  const resetFilter = useResetRecoilState(atomFilterSelected(todo?._id));
  const isItemTodoModalOpen = useRecoilValue(atomTodoModalOpen(todo?._id));

  useEffect(() => {
    isItemTodoModalOpen && resetFilter();
  }, [resetFilter, isItemTodoModalOpen]);

  return null;
};
