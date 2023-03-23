import { DisableButton } from '@buttons/disableButton';
import { PRIORITY_LEVEL } from '@constAssertions/misc';
import { CheckBox as CompleteTodoCheckBox } from '@inputs/checkbox';
import { KeysWithItemModalEffect } from '@lib/stateLogics/effects/keybindings/KeysWithItemModalEffect';
import { KeysWithTodoModalEffect } from '@lib/stateLogics/effects/keybindings/keysWithTodoModalEffect';
import { Types } from '@lib/types';
import { optionsButtonItemModalUpdate } from '@options/button';
import { atomPriority } from '@states/priorities';
import { selectorSessionTodoItem } from '@states/todos/atomQueries';
import { useTodoCompleteItem, useTodoUpdateItem } from '@states/todos/hooks';
import { classNames } from '@states/utils';
import { useConditionCompareTodoItemsEqual } from '@states/utils/hooks';
import dynamic from 'next/dynamic';
import { Fragment as FooterButtonsFragment, Fragment as HeaderContentFragment } from 'react';
import { useRecoilValue } from 'recoil';
const TodoModal = dynamic(() => import('@modals/todoModals/todoModal').then((mod) => mod.TodoModal));

export const ItemTodoModal = ({ todo }: Pick<Types, 'todo'>) => {
  const updateTodo = useTodoUpdateItem(todo._id);
  const completeTodo = useTodoCompleteItem(todo._id);
  const todoItem = useRecoilValue(selectorSessionTodoItem(todo._id));
  const currentPriority = useRecoilValue(atomPriority(todo._id));
  const condition = useConditionCompareTodoItemsEqual(todo._id);

  return (
    <TodoModal
      todo={todo}
      menuButtonContent={
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
