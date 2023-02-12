import { ICON_EDIT_NOTE } from '@data/materialSymbols';
import { DropdownMenuItem } from '@dropdowns/dropdown/dropdownMenuItem';
import { useTodoModalStateOpen } from '@states/modals/hooks';
import { TypesTodo } from 'lib/types';
import dynamic from 'next/dynamic';
import { Fragment as ModalActionsFragment } from 'react';
import { TodoItem } from './todoItem';
import { TodoItemFocuser } from './todoItemFocuser';
const TodoItemDropdown = dynamic(() => import('@dropdowns/todoItemDropdown').then((mod) => mod.TodoItemDropdown), {
  ssr: false,
});
const DeleteTodoConfirmModal = dynamic(
  () =>
    import('@modals/confirmModal/deleteConfirmModal/deleteTodoConfirmModal').then((mod) => mod.DeleteTodoConfirmModal),
  { ssr: false },
);
const ItemTodoModal = dynamic(() => import('@modals/todoModals/itemTodoModal').then((mod) => mod.ItemTodoModal), {
  ssr: false,
});
const MinimizedModal = dynamic(() => import('@modals/minimizedModal').then((mod) => mod.MinimizedModal), {
  ssr: false,
});

type Props = Pick<TypesTodo, 'todo'> & Partial<Pick<TypesTodo, 'index'>>;

export const Todo = ({ todo, index }: Props) => {
  const openModal = useTodoModalStateOpen(todo?._id);

  return (
    <>
      <div className='flex flex-row items-center justify-center px-1'>
        <div className='group relative flex w-full cursor-pointer flex-row justify-start sm:mr-4'>
          <TodoItemFocuser
            todo={todo}
            index={index!}>
            <TodoItem todo={todo} />
          </TodoItemFocuser>
          <TodoItemDropdown
            options={{ isInitiallyVisible: false }}
            todo={todo}>
            <div className='py-1'>
              <DropdownMenuItem
                options={{
                  isDisabledCloseOnClick: false,
                  path: ICON_EDIT_NOTE,
                  tooltip: 'Edit',
                  kbd: 'Enter',
                }}
                onClick={() => openModal()}>
                Edit todo
              </DropdownMenuItem>
            </div>
          </TodoItemDropdown>
        </div>
      </div>
      <ModalActionsFragment>
        {typeof todo !== 'undefined' && <DeleteTodoConfirmModal todo={todo} />}
        <ItemTodoModal todo={todo} />
        <MinimizedModal todo={todo} />
      </ModalActionsFragment>
    </>
  );
};
