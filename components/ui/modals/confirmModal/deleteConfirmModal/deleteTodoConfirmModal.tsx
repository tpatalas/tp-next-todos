import { atomQueryTodoItem } from '@atomQueries/index';
import { Types } from '@lib/types';
import { atomConfirmModalDelete, useTodoModalConfirmStateDelete } from '@states/modalStates';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

const DeleteConfirmModal = dynamic(() =>
  import('../deleteConfirmModal').then((mod) => mod.DeleteConfirmModal),
);

type Props = Pick<Types, 'todo'>;

export const DeleteTodoConfirmModal = ({ todo }: Props) => {
  const deleteConfirmModal = useTodoModalConfirmStateDelete(todo?._id);
  const isConfirmModalOpen = useRecoilValue(atomConfirmModalDelete(todo?._id));
  const todoItem = useRecoilValue(atomQueryTodoItem(todo?._id));

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
