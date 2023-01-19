import { ICON_EDIT_NOTE } from '@data/materialSymbols';
import { DropdownMenuItem } from '@dropdowns/dropdown/dropdownMenuItem';
import { useTodoModalStateOpen } from '@states/modals/hooks';
import { TypesTodo } from 'lib/types';
import dynamic from 'next/dynamic';
import { Fragment as ModalActionsFragment } from 'react';
import { TodoItem } from './todoItem';
import { TodoItemFocuser } from './todoItemFocuser';
const TodoItemDropdown = dynamic(() =>
  import('@dropdowns/todoItemDropdown').then((mod) => mod.TodoItemDropdown),
);
const DeleteTodoConfirmModal = dynamic(() =>
  import('@modals/confirmModal/deleteConfirmModal/deleteTodoConfirmModal').then(
    (mod) => mod.DeleteTodoConfirmModal,
  ),
);
const DiscardConfirmModal = dynamic(() =>
  import('@modals/confirmModal/discardConfirmModal').then((mod) => mod.DiscardConfirmModal),
);
const ItemTodoModal = dynamic(() =>
  import('@modals/todoModals/itemTodoModal').then((mod) => mod.ItemTodoModal),
);
const MinimizedModal = dynamic(() =>
  import('@modals/minimizedModal').then((mod) => mod.MinimizedModal),
);

type Props = Pick<TypesTodo, 'todo'> & Partial<Pick<TypesTodo, 'index'>>;

export const Todo = ({ todo, index }: Props) => {
  const openModal = useTodoModalStateOpen(todo?._id);

  return (
    <>
      <div className='my-2 flex flex-row items-center justify-center'>
        <div className='group relative mr-4 flex w-screen cursor-pointer flex-row justify-between sm:max-w-[46rem]'>
          <TodoItemFocuser
            todo={todo}
            index={index!}>
            <TodoItem todo={todo} />
          </TodoItemFocuser>
          <TodoItemDropdown
            data={{ isInitiallyVisible: false }}
            todo={todo}>
            <div className='py-1'>
              <DropdownMenuItem
                onClick={() => openModal()}
                path={ICON_EDIT_NOTE}
                tooltip='Edit'
                kbd='Enter'>
                Edit todo
              </DropdownMenuItem>
            </div>
          </TodoItemDropdown>
        </div>
      </div>
      <ModalActionsFragment>
        <ItemTodoModal todo={todo} />
        <DiscardConfirmModal todo={todo} />
        <DeleteTodoConfirmModal todo={todo} />
        <MinimizedModal todo={todo} />
      </ModalActionsFragment>
    </>
  );
};
