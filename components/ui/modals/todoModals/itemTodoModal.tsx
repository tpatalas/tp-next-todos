import { atomQueryTodoItem } from '@atomQueries/index';
import { DisableButton } from '@buttons/disableButton';
import { dataButtonItemModalUpdate } from '@data/dataObjects';
import { PRIORITY_LEVEL } from '@data/stateObjects';
import { TodoModalWithKeyEffect } from '@effects/todoModalWithKeyEffect';
import { CheckBox as CompleteTodoCheckBox } from '@inputs/checkbox';
import { Types } from '@lib/types';
import { classNames } from '@lib/utils';
import { atomPriority } from '@states/priorityStates';
import { useTodoStateComplete, useTodoStateUpdate } from '@states/todoStates';
import { useConditionCompareTodoItemsEqual } from '@states/utilsStates';
import dynamic from 'next/dynamic';
import { Fragment as FooterButtonsFragment, Fragment as HeaderContentFragment } from 'react';
import { useRecoilValue } from 'recoil';
const TodoModal = dynamic(() =>
  import('@modals/todoModals/todoModal').then((mod) => mod.TodoModal),
);

export const ItemTodoModal = ({ todo }: Pick<Types, 'todo'>) => {
  const updateTodo = useTodoStateUpdate(todo._id);
  const completeTodo = useTodoStateComplete(todo._id);
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
              checked={todoItem.completed}
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
            data={dataButtonItemModalUpdate}
            conditionalRendering={condition}
            onClick={() => updateTodo()}>
            Update
          </DisableButton>
        </FooterButtonsFragment>
      }>
      <TodoModalWithKeyEffect todo={todo} />
    </TodoModal>
  );
};
