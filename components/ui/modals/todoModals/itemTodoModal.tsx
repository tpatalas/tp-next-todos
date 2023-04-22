import { DisableButton } from '@buttons/disableButton';
import { PRIORITY_LEVEL } from '@constAssertions/misc';
import { KeysWithItemModalEffect } from '@effects/KeysWithItemModalEffect';
import { KeysWithTodoModalEffect } from '@effects/keysWithTodoModalEffect';
import { useConditionCompareTodoItemsEqual } from '@hooks/misc';
import { useTodoCompleteItem, useTodoUpdateItem } from '@hooks/todos';
import { CheckBox as CompleteTodoCheckBox } from '@inputs/checkbox';
import { Types } from '@lib/types';
import { optionsButtonItemModalUpdate } from '@options/button';
import { classNames } from '@stateLogics/utils';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import { atomPriority } from '@states/priorities';
import { Fragment as FooterButtonsFragment, Fragment as HeaderContentFragment } from 'react';
import { useRecoilValue } from 'recoil';
import { TodoModal } from './todoModal';

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
          <div className='mb-[0.045em] mr-3'>
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
            onClick={() => updateTodo()}
          >
            Update
          </DisableButton>
        </FooterButtonsFragment>
      }
    >
      <KeysWithTodoModalEffect todo={todo} />
      <KeysWithItemModalEffect todo={todo} />
    </TodoModal>
  );
};
