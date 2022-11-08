import { SvgIcon } from '@components/icons/svgIcon';
import {
  Div as DivCheckBox,
  Div as DivDueDate,
  Div as DivInfo,
  Div as DivItem,
  Div as DivTodoItem,
  Div as DivTodoItemTitle,
} from '@containers/div';
import { Para as ParaTodoItemDescription } from '@containers/para';
import {
  dataSvgCalendarDueDate,
  dataSvgPriorityImportant,
  dataSvgPriorityUrgent,
} from '@data/dataObjects';
import { PRIORITY_LEVEL } from '@data/stateObjects';
import { useModalStateOpen } from '@hooks/useModals';
import { useTodoStateComplete } from '@hooks/useTodos';
import { CheckBox as CompleteTodoCheckBox } from '@inputs/checkbox';
import { TypesTodo } from '@lib/types';
import { classNames } from '@lib/utils';
import { atomQueryTodoItem } from '@states/atoms/atomQuery';
import { format } from 'date-fns';
import { Fragment as TodoItemFragment } from 'react';
import { useRecoilValue } from 'recoil';

type Props = Pick<TypesTodo, 'todo'>;

export const TodoItem = ({ todo }: Props) => {
  const openModal = useModalStateOpen(todo._id);
  const completeTodo = useTodoStateComplete(todo._id);
  const todoItem = useRecoilValue(atomQueryTodoItem(todo._id));

  return (
    <TodoItemFragment>
      <DivCheckBox className='relative bottom-px ml-1 flex items-start '>
        <CompleteTodoCheckBox
          todoItem={todoItem}
          checked={todoItem.completed}
          checkBoxColor={classNames(
            todoItem.priorityLevel === PRIORITY_LEVEL['important'] && 'border-yellow-500 border-2 ',
            todoItem.priorityLevel === PRIORITY_LEVEL['urgent'] && 'border-red-600 border-2 ',
          )}
          onChange={() => completeTodo()}
        />
      </DivCheckBox>
      <DivTodoItem
        className='ml-4 w-full max-w-sm select-none text-base sm:max-w-2xl'
        onDoubleClick={() => openModal()}>
        <DivItem
          className={classNames(
            'break-words pr-1 ',
            todoItem.completed ? 'italic opacity-60' : '',
          )}>
          <DivTodoItemTitle
            className={classNames(
              'font-medium decoration-red-600 decoration-2 line-clamp-1',
              todoItem.completed ? ' text-gray-500 line-through' : '',
            )}>
            {todoItem.title}
          </DivTodoItemTitle>
          <ParaTodoItemDescription className='text-sm text-gray-500 line-clamp-2'>
            {todoItem.note}
          </ParaTodoItemDescription>
        </DivItem>
        <DivInfo className='flex flex-row items-center'>
          {todoItem.priorityLevel === PRIORITY_LEVEL['urgent'] && (
            <DivDueDate className='mt-2 mr-3 flex flex-row items-center text-gray-500'>
              <SvgIcon data={dataSvgPriorityUrgent} />
              <div className='ml-1 text-sm'>Urgent</div>
            </DivDueDate>
          )}
          {todoItem.priorityLevel === PRIORITY_LEVEL['important'] && (
            <DivDueDate className='mt-2 mr-3 flex flex-row items-center text-gray-500'>
              <SvgIcon data={dataSvgPriorityImportant} />
              <div className='ml-1 text-sm'>Important</div>
            </DivDueDate>
          )}
          {todoItem.dueDate !== null && typeof todoItem.dueDate !== 'undefined' && (
            <DivDueDate className='mt-2 flex flex-row items-center text-gray-500'>
              <SvgIcon data={dataSvgCalendarDueDate} />
              <div className='ml-1 text-sm'>{format(new Date(todoItem.dueDate), 'MMM dd, yy')}</div>
            </DivDueDate>
          )}
        </DivInfo>
      </DivTodoItem>
    </TodoItemFragment>
  );
};
