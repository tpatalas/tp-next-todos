import dynamic from 'next/dynamic';

export const DeleteTodoConfirmModal = dynamic(() =>
  import('@modals/confirmModal/deleteConfirmModal/deleteTodoConfirmModal').then(
    (mod) => mod.DeleteTodoConfirmModal,
  ),
);

export const ItemTodoModal = dynamic(() =>
  import('@modals/todoModals/itemTodoModal').then((mod) => mod.ItemTodoModal),
);

export const MinimizedModal = dynamic(() =>
  import('@modals/minimizedModal').then((mod) => mod.MinimizedModal),
);
