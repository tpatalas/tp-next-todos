import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { IconButton } from '@buttons/iconButton';
import { optionsButtonLabelRemove, optionsDropdownComboBox } from '@data/dataOptions';
import { CATCH, GRADIENT_POSITION, PRIORITY_LEVEL } from '@data/dataTypesConst';
import { Types } from '@lib/types';
import { selectorSelectedLabels } from '@states/labels';
import { useLabelRemoveItemTitleId } from '@states/labels/hooks';
import { useTodoModalStateClose } from '@states/modals/hooks';
import { atomTodoNew } from '@states/todos';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import { atomCatch, classNames, paths } from '@states/utils';
import { LabelComboBox } from '@ui/comboBoxes/labelComboBox';
import { LabelsHorizontalGradients } from '@ui/gradients/labelsHorizontalGradients';
import { Fragment as LabelComboBoxDropdownFragment, useRef } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { Dropdown } from './dropdown';

type Props = Partial<Pick<Types, 'selectedQueryLabels' | 'container' | 'todo'>>;

export const LabelComboBoxDropdown = ({ todo, selectedQueryLabels, container }: Props) => {
  const removeTitleId = useLabelRemoveItemTitleId(todo?._id);
  const closeTodoModal = useTodoModalStateClose(todo?._id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedLabels = selectedQueryLabels ? selectedQueryLabels : useRecoilValue(selectorSelectedLabels(todo?._id));
  const isTodoCompleted = useRecoilCallback(({ snapshot }) => () => {
    return typeof todo !== 'undefined' && snapshot.getLoadable(atomQueryTodoItem(todo?._id)).getValue().completed;
  });
  const todoItem = useRecoilValue(typeof todo !== 'undefined' ? atomQueryTodoItem(todo?._id) : atomTodoNew);
  const important = todoItem.priorityLevel === PRIORITY_LEVEL['important'];
  const urgent = todoItem.priorityLevel === PRIORITY_LEVEL['urgent'];
  const priority = important || urgent;
  const dueDate = todoItem.dueDate !== null && typeof todoItem.dueDate !== 'undefined';
  const priorityAndDueDate = priority && dueDate;
  const isTodoModalOpen = useRecoilValue(atomCatch(CATCH['todoModal']));

  const dynamicLabelWidth = !isTodoModalOpen
    ? classNames(
        'w-[83%] sm:w-[92%]',
        !priorityAndDueDate && 'md:w-[90%] lg:w-[92%]',
        priorityAndDueDate && 'md:w-[90%] ml:w-[54%] lg:w-[64%] xl:w-[67%]',
        (priority || dueDate) && !priorityAndDueDate && 'md:w-[88%] ml:w-[74%] lg:w-[76%]',
      )
    : 'w-[calc(84vw-8rem)] sm:w-[74%] md:w-[76%]';

  return (
    <LabelComboBoxDropdownFragment>
      <div className={classNames('relative flex flex-row', container ?? dynamicLabelWidth)}>
        <LabelsHorizontalGradients
          scrollRef={scrollRef}
          position={GRADIENT_POSITION['left']}
        />
        <div
          className={classNames(
            'scrollbar-hide ml-0 flex w-full flex-row items-center justify-start overflow-x-auto py-1 px-1 lg:ml-1 lg:px-1',
          )}
          ref={scrollRef}>
          {!isTodoCompleted() && (
            <Dropdown
              options={optionsDropdownComboBox}
              menuButtonContent={selectedLabels.length === 0 && 'Label'}>
              <LabelComboBox todo={todo} />
            </Dropdown>
          )}
          <ul className='flex flex-row items-center justify-center'>
            {selectedLabels.map((label) => (
              <li key={label._id}>
                <div
                  className={classNames(
                    'mx-[0.12rem] flex cursor-pointer flex-row items-center justify-center rounded-lg py-[3px] pl-2 pr-1 text-sm text-gray-700',
                    label.color && label.color,
                    'bg-blue-100 bg-opacity-60 text-slate-600 shadow-sm hover:bg-opacity-70 hover:text-slate-800',
                  )}>
                  <PrefetchRouterButton
                    options={{
                      path: paths('/app/label/', label._id),
                      className: 'max-w-[5.3rem] truncate pr-1',
                      tooltip: `Go to ${label.name}`,
                    }}
                    onClick={() => closeTodoModal()}>
                    {label.name}
                  </PrefetchRouterButton>
                  {!isTodoCompleted() && (
                    <IconButton
                      options={optionsButtonLabelRemove}
                      onClick={() => removeTitleId(label._id)}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <LabelsHorizontalGradients
          scrollRef={scrollRef}
          position={GRADIENT_POSITION['right']}
        />
      </div>
    </LabelComboBoxDropdownFragment>
  );
};
