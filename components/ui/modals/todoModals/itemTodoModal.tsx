import { DisableButton } from '@buttons/disableButton';
import { optionsButtonItemModalUpdate } from '@data/dataOptions';
import { PRIORITY_LEVEL } from '@data/dataTypesConst';
import { CheckBox as CompleteTodoCheckBox } from '@inputs/checkbox';
import { Types } from '@lib/types';
import { KeysWithItemModalEffect } from '@states/keybinds/KeysWithItemModalEffect';
import { KeysWithTodoModalEffect } from '@states/keybinds/keysWithTodoModalEffect';
import { atomPriority } from '@states/priorities';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import { useTodoCompleteItem, useTodoUpdateItem } from '@states/todos/hooks';
import { classNames } from '@states/utils';
import { useConditionCompareTodoItemsEqual } from '@states/utils/hooks';
import dynamic from 'next/dynamic';
import { Fragment as FooterButtonsFragment, Fragment as HeaderContentFragment } from 'react';
import { useRecoilValue } from 'recoil';
const TodoModal = dynamic(() => import('@modals/todoModals/todoModal').then((mod) => mod.TodoModal), { ssr: false });

export const ItemTodoModal = ({ todo }: Pick<Types, 'todo'>) => {
  const updateTodo = useTodoUpdateItem(todo._id);
  const completeTodo = useTodoCompleteItem(todo._id);
  const todoItem = useRecoilValue(atomQueryTodoItem(todo._id));
  const currentPriority = useRecoilValue(atomPriority(todo._id));
  const condition = useConditionCompareTodoItemsEqual(todo._id);

  return (
    <TodoModal
      todo={todo}
      headerContents={
        <HeaderContentFragment>
          <div className='mr-3 mb-[0.045em]'>
            <CompleteTodoCheckBox
              todoItem={todoItem}
              isChecked={todoItem.completed}
              checkBoxColor={classNames(
                currentPriority === PRIORITY_LEVEL['important'] && 'border-yellow-500 border-2 ',
                currentPriority === PRIORITY_LEVEL['urgent'] && 'border-red-600 border-2 ',
              )}
              className='text-red-600 '
              onChange={() => completeTodo()}
            />
          </div>
        </HeaderContentFragment>
      }
      footerButtons={
        <FooterButtonsFragment>
          <DisableButton
            options={optionsButtonItemModalUpdate}
            isConditionalRendering={condition}
            onClick={() => updateTodo()}>
            Update
          </DisableButton>
        </FooterButtonsFragment>
      }>
      <KeysWithTodoModalEffect todo={todo} />
      <KeysWithItemModalEffect todo={todo} />
    </TodoModal>
  );
};
