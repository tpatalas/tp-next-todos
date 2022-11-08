import { Div as DivDivide, Div as DivTodoItem, Div as DivTodos } from '@containers/div';
import { ICON_EDIT_NOTE } from '@data/materialSymbols';
import { DropdownMenuItem } from '@dropdowns/dropdown/dropdownMenuItem';
import { useModalStateOpen } from '@hooks/useModals';
import { TypesTodo } from 'lib/types';
import dynamic from 'next/dynamic';
import { Fragment as ModalActionsFragment } from 'react';
import { TodoItem } from './todoItem';
import { TodoItemFocuser } from './todoItemFocuser';
const TodoItemDropdown = dynamic(() =>
  import('@dropdowns/todoItemDropdown').then((mod) => mod.TodoItemDropdown),
);
const DeleteConfirmModal = dynamic(() =>
  import('@modals/confirmModal/deleteConfirmModal').then((mod) => mod.DeleteConfirmModal),
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
  const openModal = useModalStateOpen(todo?._id);

  return (
    <>
      <DivTodos className='my-2 flex flex-row items-center justify-center'>
        <DivTodoItem className='group relative mr-4 flex w-screen cursor-pointer flex-row justify-between sm:max-w-[46rem]'>
          <TodoItemFocuser
            todo={todo}
            index={index!}>
            <TodoItem todo={todo} />
          </TodoItemFocuser>
          <TodoItemDropdown
            data={{ initialVisible: false }}
            todo={todo}>
            <DivDivide className='py-1'>
              <DropdownMenuItem
                onClick={() => openModal()}
                path={ICON_EDIT_NOTE}
                tooltip='Edit'
                kbd='Enter'>
                Edit todo
              </DropdownMenuItem>
            </DivDivide>
          </TodoItemDropdown>
        </DivTodoItem>
      </DivTodos>
      <ModalActionsFragment>
        <ItemTodoModal todo={todo} />
        <DiscardConfirmModal todo={todo} />
        <DeleteConfirmModal todo={todo} />
        <MinimizedModal todo={todo} />
      </ModalActionsFragment>
    </>
  );
};
