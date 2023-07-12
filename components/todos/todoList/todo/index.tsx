import { ICON_EDIT_NOTE } from '@data/materialSymbols';
import { DropdownMenuItem } from '@dropdowns/v1/dropdown/dropdownMenuItem';
import { TodoItemDropdown } from '@dropdowns/v1/todoItemDropdown';
import { Fragment as ModalActionsFragment } from 'react';
import { TodoItemFocuser } from './todoItemFocuser';
import { useTodoModalStateOpen } from '@hooks/modals';
import { TodoItem } from './todoItem';
import {
  DeleteTodoConfirmModal,
  ItemTodoModal,
  MinimizedModal,
} from '@components/todos/todos.dynamicImports';
import { TypesTodo } from '@components/todos/todos.types';

type Props = Pick<TypesTodo, 'todo'> & Partial<Pick<TypesTodo, 'index'>>;

export const Todo = ({ todo, index }: Props) => {
  const openModal = useTodoModalStateOpen(todo?._id);

  return (
    <>
      <div className='flex flex-row items-center justify-center px-1'>
        <div className='group relative flex w-full cursor-pointer flex-row justify-start'>
          <TodoItemFocuser
            todo={todo}
            index={index!}
          >
            <TodoItem todo={todo} />
          </TodoItemFocuser>
          <TodoItemDropdown
            options={{ isInitiallyVisible: false }}
            todo={todo}
          >
            <div className='py-1'>
              <DropdownMenuItem
                options={{
                  shouldKeepOpeningOnClick: false,
                  path: ICON_EDIT_NOTE,
                  tooltip: 'Edit',
                  kbd: 'Enter',
                }}
                onClick={() => openModal()}
              >
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
