import { DisableButton } from '@buttons/disableButton';
import { Div as DivCheckbox } from '@containers/div';
import { dataButtonItemModalUpdate } from '@data/dataObjects';
import { PRIORITY_LEVEL } from '@data/stateObjects';
import { useTodoStateComplete, useTodoStateUpdate } from '@hooks/useTodos';
import { CheckBox as CompleteTodoCheckBox } from '@inputs/checkbox';
import { Types } from '@lib/types';
import { classNames } from '@lib/utils';
import { atomPriority } from '@states/atoms';
import { atomQueryTodoItem } from '@states/atoms/atomQuery';
import { ItemModalWithKeyEffect } from '@states/Effects/itemModalWithKeyEffect';
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

  return (
    <TodoModal
      todo={todo}
      headerContents={
        <HeaderContentFragment>
          <DivCheckbox className='mr-3 mb-[0.045em]'>
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
          </DivCheckbox>
        </HeaderContentFragment>
      }
      footerButtons={
        <FooterButtonsFragment>
          <DisableButton
            todo={todo}
            data={dataButtonItemModalUpdate}
            onClick={() => updateTodo()}>
            Update
          </DisableButton>
        </FooterButtonsFragment>
      }>
      <ItemModalWithKeyEffect todo={todo} />
    </TodoModal>
  );
};
