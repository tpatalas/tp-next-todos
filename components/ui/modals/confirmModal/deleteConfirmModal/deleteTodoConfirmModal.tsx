import { useTodoModalConfirmStateDelete } from '@hooks/modals';
import { Types } from '@lib/types';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import { atomConfirmModalDelete } from '@states/modals';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

const DeleteConfirmModal = dynamic(() => import('../deleteConfirmModal').then((mod) => mod.DeleteConfirmModal));

type Props = Pick<Types, 'todo'>;

export const DeleteTodoConfirmModal = ({ todo }: Props) => {
  const deleteConfirmModal = useTodoModalConfirmStateDelete(todo?._id);
  const isConfirmModalOpen = useRecoilValue(atomConfirmModalDelete(todo?._id));
  const todoItem = useRecoilValue(selectorSessionTodoItem(todo?._id));

  return (
    <Fragment>
      <DeleteConfirmModal
        itemIds={todo}
        show={isConfirmModalOpen}
        deletingItem={todoItem.title}
        onClickConfirm={() => deleteConfirmModal()}
      />
    </Fragment>
  );
};
