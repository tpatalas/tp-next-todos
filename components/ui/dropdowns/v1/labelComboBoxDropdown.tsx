import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { IconButton } from '@buttons/iconButton';
import { Types } from '@lib/types';
import { selectorSelectedLabels } from '@states/labels';
import { LabelComboBox } from '@ui/comboBoxes/labelComboBox';
import { LabelsHorizontalGradients } from '@ui/gradients/labelsHorizontalGradients';
import { Fragment as LabelComboBoxDropdownFragment, useRef } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { Dropdown } from './dropdown';
import { PATH_APP } from '@constAssertions/data';
import { PRIORITY_LEVEL } from '@constAssertions/misc';
import { GRADIENT_POSITION } from '@constAssertions/ui';
import { optionsButtonLabelRemove } from '@options/button';
import { optionsDropdownComboBox } from '@options/misc';
import { useLabelRemoveItemTitleId } from '@hooks/labels';
import { useTodoModalStateClose } from '@hooks/modals';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import { atomTodoNew } from '@states/todos';
import { classNames, paths } from '@stateLogics/utils';

type Props = Partial<Pick<Types, 'selectedQueryLabels' | 'container' | 'todo'>>;

export const LabelComboBoxDropdown = ({ todo, selectedQueryLabels, container }: Props) => {
  const removeTitleId = useLabelRemoveItemTitleId(todo?._id);
  const closeTodoModal = useTodoModalStateClose(todo?._id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedLabelsSelector = useRecoilValue(selectorSelectedLabels(todo?._id));
  const selectedLabels = selectedQueryLabels ? selectedQueryLabels : selectedLabelsSelector;
  const isTodoCompleted = useRecoilCallback(({ snapshot }) => () => {
    return (
      typeof todo !== 'undefined' &&
      snapshot.getLoadable(selectorSessionTodoItem(todo?._id)).getValue().completed
    );
  });
  const todoItem = useRecoilValue(
    typeof todo !== 'undefined' ? selectorSessionTodoItem(todo?._id) : atomTodoNew,
  );
  const important = todoItem.priorityLevel === PRIORITY_LEVEL['important'];
  const urgent = todoItem.priorityLevel === PRIORITY_LEVEL['urgent'];
  const priority = important || urgent;
  const dueDate = todoItem.dueDate !== null && typeof todoItem.dueDate !== 'undefined';
  const priorityAndDueDate = priority && dueDate;

  const dynamicLabelWidth = classNames(
    'w-[calc(100%-3rem)]  md:w-[calc(100%-4rem)]',
    priorityAndDueDate && 'ml:w-[calc(100%-13rem)]',
    !priorityAndDueDate && 'ml:w-[calc(100%-4rem)]',
    (priority || dueDate) && !priorityAndDueDate && 'ml:w-[calc(100%-9rem)]',
  );

  return (
    <LabelComboBoxDropdownFragment>
      <div className={classNames('relative flex flex-row', container ?? dynamicLabelWidth)}>
        <LabelsHorizontalGradients
          scrollRef={scrollRef}
          position={GRADIENT_POSITION['left']}
        />
        <div
          className={classNames(
            'scrollbar-hide ml-0 flex w-full flex-row items-center justify-start overflow-x-auto px-1 py-1 lg:ml-1 lg:px-1',
          )}
          ref={scrollRef}
        >
          {!isTodoCompleted() && (
            <Dropdown
              options={optionsDropdownComboBox}
              menuButtonContent={selectedLabels.length === 0 && 'Label'}
            >
              <LabelComboBox todo={todo} />
            </Dropdown>
          )}
          <ul className='flex flex-row items-center justify-center'>
            {selectedLabels.map((label) => (
              <li key={label._id}>
                <div
                  className={classNames(
                    'group/label',
                    'mx-[0.25rem] flex cursor-pointer flex-row items-center justify-center rounded-lg py-[2px] pl-2 pr-1 text-sm text-gray-700',
                    label.color && label.color,
                    'translate-all hover-text-opacity-100 text-opacity-80 shadow-sm ring-2 ring-opacity-70 hover:text-opacity-100 hover:ring-opacity-100  ',
                  )}
                >
                  <PrefetchRouterButton
                    options={{
                      path: paths(PATH_APP['label'] + '/', label._id),
                      className: 'max-w-[5.3rem] truncate pr-1',
                      tooltip: `Go to ${label.name}`,
                      offset: [8, 15],
                    }}
                    onClick={() => closeTodoModal()}
                  >
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
