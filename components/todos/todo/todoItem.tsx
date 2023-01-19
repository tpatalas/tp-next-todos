import { SvgIcon } from '@components/icons/svgIcon';
import {
  dataSvgCalendarDueDate,
  dataSvgPriorityImportant,
  dataSvgPriorityUrgent,
} from '@data/dataObjects';
import { PRIORITY_LEVEL } from '@data/stateObjects';
import { CheckBox as CompleteTodoCheckBox } from '@inputs/checkbox';
import { TypesTodo } from '@lib/types';
import { useTodoModalStateOpen } from '@states/modals/hooks';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import { useTodoStateComplete } from '@states/todos/hooks';
import { classNames } from '@states/utils';
import { format } from 'date-fns';
import { Fragment as TodoItemFragment } from 'react';
import { useRecoilValue } from 'recoil';

type Props = Pick<TypesTodo, 'todo'>;

export const TodoItem = ({ todo }: Props) => {
  const openModal = useTodoModalStateOpen(todo._id);
  const completeTodo = useTodoStateComplete(todo._id);
  const todoItem = useRecoilValue(atomQueryTodoItem(todo._id));

  return (
    <TodoItemFragment>
      <div className='relative bottom-px ml-1 flex items-start '>
        <CompleteTodoCheckBox
          todoItem={todoItem}
          isChecked={todoItem.isCompleted}
          checkBoxColor={classNames(
            todoItem.priorityLevel === PRIORITY_LEVEL['important'] && 'border-yellow-500 border-2 ',
            todoItem.priorityLevel === PRIORITY_LEVEL['urgent'] && 'border-red-600 border-2 ',
          )}
          onChange={() => completeTodo()}
        />
      </div>
      <div
        className='ml-4 w-full max-w-sm select-none text-base sm:max-w-2xl'
        onDoubleClick={() => openModal()}>
        <div
          className={classNames(
            'break-words pr-1 ',
            todoItem.isCompleted ? 'italic opacity-60' : '',
          )}>
          <div
            className={classNames(
              'font-medium decoration-red-600 decoration-2 line-clamp-1',
              todoItem.isCompleted ? ' text-gray-500 line-through' : '',
            )}>
            {todoItem.title}
          </div>
          <p className='text-sm text-gray-500 line-clamp-2'>{todoItem.note}</p>
        </div>
        <div className='flex flex-row items-center'>
          {todoItem.priorityLevel === PRIORITY_LEVEL['urgent'] && (
            <div className='mt-2 mr-3 flex flex-row items-center text-gray-500'>
              <SvgIcon data={dataSvgPriorityUrgent} />
              <div className='ml-1 text-sm'>Urgent</div>
            </div>
          )}
          {todoItem.priorityLevel === PRIORITY_LEVEL['important'] && (
            <div className='mt-2 mr-3 flex flex-row items-center text-gray-500'>
              <SvgIcon data={dataSvgPriorityImportant} />
              <div className='ml-1 text-sm'>Important</div>
            </div>
          )}
          {todoItem.dueDate !== null && typeof todoItem.dueDate !== 'undefined' && (
            <div className='mt-2 flex flex-row items-center text-gray-500'>
              <SvgIcon data={dataSvgCalendarDueDate} />
              <div className='ml-1 text-sm'>{format(new Date(todoItem.dueDate), 'MMM dd, yy')}</div>
            </div>
          )}
        </div>
      </div>
    </TodoItemFragment>
  );
};
