import { TypesTodo } from '@components/todos/todos.types';
import { PRIORITY_LEVEL, CATCH } from '@constAssertions/misc';
import { LabelComboBoxDropdown } from '@dropdowns/v1/labelComboBoxDropdown';
import { useTodoModalStateOpen } from '@hooks/modals';
import { useTodoCompleteItem } from '@hooks/todos';
import { SvgIcon } from '@icon/svgIcon';
import { CheckBox } from '@inputs/checkbox';
import { selectorSelectedQueryLabels } from '@label/label.states';
import {
  optionsSvgPriorityUrgent,
  optionsSvgPriorityImportant,
  optionsSvgCalendarDueDate,
} from '@options/svg';
import { classNames } from '@stateLogics/utils';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import { atomCatch } from '@states/misc';
import { format } from 'date-fns';
import { Fragment as CheckBoxFragment, Fragment as TodoItemFragment } from 'react';
import { useRecoilValue } from 'recoil';

export const TodoItem = ({ todo }: Pick<TypesTodo, 'todo'>) => {
  const openModal = useTodoModalStateOpen(todo._id);
  const completeTodo = useTodoCompleteItem(todo._id);
  const todoItem = useRecoilValue(selectorSessionTodoItem(todo._id));
  const important = todoItem.priorityLevel === PRIORITY_LEVEL['important'];
  const urgent = todoItem.priorityLevel === PRIORITY_LEVEL['urgent'];
  const selectedQueryLabels = useRecoilValue(selectorSelectedQueryLabels(todo._id));
  const isComboBoxOpen = useRecoilValue(atomCatch(CATCH['comboBox']));
  const isTodoModalOpen = useRecoilValue(atomCatch(CATCH['todoModal']));

  return (
    <TodoItemFragment>
      <CheckBoxFragment>
        <div className='relative bottom-px ml-1 flex items-start '>
          <CheckBox
            todoItem={todoItem}
            isChecked={todoItem.completed}
            checkBoxColor={classNames(
              !important && !urgent && 'border-blue-600 border-2',
              important && 'border-yellow-500 border-2',
              urgent && 'border-red-600 border-2',
            )}
            checkedColor={classNames(
              !important && !urgent && 'text-blue-600',
              important && 'text-yellow-500',
              urgent && 'text-red-600',
            )}
            onChange={() => completeTodo()}
          />
        </div>
      </CheckBoxFragment>
      <div
        className='ml-4 w-full select-none text-base'
        onDoubleClick={() => !isComboBoxOpen && !isTodoModalOpen && openModal()}
      >
        <div className={classNames('break-words pr-10', todoItem.completed ? 'italic opacity-80' : '')}>
          <div
            className={classNames(
              'line-clamp-1 font-medium decoration-2',
              urgent && 'decoration-red-600',
              important && 'decoration-yellow-500',
              !important && !urgent && 'decoration-blue-600',
              todoItem.completed ? ' text-gray-500 line-through' : '',
            )}
          >
            {todoItem.title}
          </div>
          <p className='line-clamp-1 text-sm text-gray-500 sm:line-clamp-2'>{todoItem.note}</p>
        </div>
        <div className='-ml-2 mt-1 flex w-full flex-col items-start justify-start pr-2 ml:flex-row ml:items-center'>
          <div className='flex flex-row'>
            {todoItem.priorityLevel === PRIORITY_LEVEL['urgent'] && (
              <div className='m-2 flex flex-row items-center text-gray-500'>
                <SvgIcon options={optionsSvgPriorityUrgent} />
                <div className='ml-1 whitespace-nowrap text-sm'>Urgent</div>
              </div>
            )}
            {todoItem.priorityLevel === PRIORITY_LEVEL['important'] && (
              <div className='m-2 flex flex-row items-center text-gray-500'>
                <SvgIcon options={optionsSvgPriorityImportant} />
                <div className='ml-1 whitespace-nowrap text-sm'>Important</div>
              </div>
            )}
            {todoItem.dueDate !== null && typeof todoItem.dueDate !== 'undefined' && (
              <div className='m-2 flex flex-row items-center text-gray-500'>
                <SvgIcon options={optionsSvgCalendarDueDate} />
                <div className='ml-1 whitespace-nowrap text-sm'>
                  {format(new Date(todoItem.dueDate), 'MMM dd, yy')}
                </div>
              </div>
            )}
          </div>
          <LabelComboBoxDropdown
            todo={todo}
            selectedQueryLabels={selectedQueryLabels}
          />
        </div>
      </div>
    </TodoItemFragment>
  );
};
