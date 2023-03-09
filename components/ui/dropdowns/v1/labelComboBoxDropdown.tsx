import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { IconButton } from '@buttons/iconButton';
import { optionsButtonLabelRemove, optionsDropdownComboBox } from '@data/dataOptions';
import { GRADIENT_POSITION } from '@data/dataTypesConst';
import { Types } from '@lib/types';
import { selectorSelectedLabels } from '@states/labels';
import { useLabelRemoveItemTitleId } from '@states/labels/hooks';
import { useTodoModalStateClose } from '@states/modals/hooks';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import { classNames, paths } from '@states/utils';
import { LabelComboBox } from '@ui/comboBoxes/labelComboBox';
import { LabelsHorizontalGradients } from '@ui/gradients/labelsHorizontalGradients';
import { Fragment as LabelComboBoxDropdownFragment, useRef } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { Dropdown } from './dropdown';

type Props = Partial<Pick<Types, 'todo' | 'selectedQueryLabels' | 'container'>>;

export const LabelComboBoxDropdown = ({ todo, selectedQueryLabels, container }: Props) => {
  const removeTitleId = useLabelRemoveItemTitleId(todo?._id);
  const closeTodoModal = useTodoModalStateClose(todo?._id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedLabels = selectedQueryLabels ? selectedQueryLabels : useRecoilValue(selectorSelectedLabels(todo?._id));
  const isTodoCompleted = useRecoilCallback(({ snapshot }) => () => {
    return typeof todo !== 'undefined' && snapshot.getLoadable(atomQueryTodoItem(todo?._id)).getValue().completed;
  });

  return (
    <LabelComboBoxDropdownFragment>
      <div
        className={classNames(
          'relative flex flex-row',
          container ?? 'w-[calc(80vw-6rem)] max-w-[32rem] md:w-[calc(50vw-2rem)] ml:w-[calc(55vw-13rem)]',
        )}>
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
                    'bg-opacity-40 hover:bg-opacity-60',
                  )}>
                  <PrefetchRouterButton
                    options={{
                      path: paths('/app/label/', label._id),
                      className: 'max-w-[5.3rem] truncate pr-1',
                      tooltip: label.name,
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
