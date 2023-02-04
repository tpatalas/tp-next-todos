import { DisableButton } from '@buttons/disableButton';
import { TodoEditors } from '@components/editors/todoEditor';
import { optionsButtonTodoModalAddTodo, optionsButtonTodoModalCancel } from '@data/dataOptions';
import { CalendarDropdown } from '@dropdowns/calendarDropdown';
import { LabelComboBoxDropdown } from '@dropdowns/labelComboBoxDropdown';
import { DeleteTodoConfirmModal } from '@modals/confirmModal/deleteConfirmModal/deleteTodoConfirmModal';
import { DiscardConfirmModal } from '@modals/confirmModal/discardConfirmModal';
import { LabelModal } from '@modals/labelModals/labelModal';
import { TodoModalHeaderButtons } from '@modals/todoModals/todoModal/todoModalHeaderButtons';
import { useCalUpdateItem } from '@states/calendars/hooks';
import { KeysWithTodoModalEffect } from '@states/keybinds/keysWithTodoModalEffect';
import { DisableScrollEffect } from '@states/misc/disableScrollEffect';
import { atomTodoModalMax, atomTodoModalOpen } from '@states/modals';
import { useTodoModalStateClose } from '@states/modals/hooks';
import { useTodoAdd } from '@states/todos/hooks';
import { classNames } from '@states/utils';
import { useConditionCheckTodoTitleEmpty } from '@states/utils/hooks';
import { Types } from 'lib/types';
import { Fragment as TodoModalFragment, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Button as CancelButton } from '../../../buttons/button';
import { Divider as PlainLineDivider } from '../../../dividers/divider';
import { ModalTransitionChild } from '../../modal/modalTransition/modalTransitionChild';
import { ModalTransitionRoot } from '../../modal/modalTransition/modalTransitionRoot';
import { TodoModalHeaderContents } from './todoModalHeaderContents';

type Props = Partial<Pick<Types, 'todo' | 'children' | 'headerContents' | 'footerButtons' | 'headerButtons'>>;

export const TodoModal = ({ todo, headerContents, headerButtons, footerButtons, children }: Props) => {
  const isTodoModalOpen = useRecoilValue(atomTodoModalOpen(todo?._id));
  const isTodoModalMax = useRecoilValue(atomTodoModalMax(todo?._id));
  const closeModal = useTodoModalStateClose(todo?._id);
  const initialFocusDiv = useRef<HTMLDivElement>(null);
  const updateCalendarItem = useCalUpdateItem(todo?._id);
  const addTodo = useTodoAdd();
  const condition = useConditionCheckTodoTitleEmpty();

  return (
    <TodoModalFragment>
      <ModalTransitionRoot
        show={isTodoModalOpen}
        initialFocus={initialFocusDiv}
        onClose={() => closeModal()}>
        {/* nested modal */}
        <LabelModal label={undefined} />
        <DiscardConfirmModal todo={todo} />
        {typeof todo !== 'undefined' && <DeleteTodoConfirmModal todo={todo} />}
        <ModalTransitionChild
          className={classNames(
            'h-[28rem] px-4 pt-2 pb-5 sm:relative',
            isTodoModalMax
              ? 'sm:bottom-0 sm:h-full sm:max-h-[90vh] sm:max-w-[90vw] xl:max-w-6xl'
              : 'sm:max-h-[28rem] sm:max-w-2xl md:bottom-[calc(23vh-6rem)]',
          )}>
          <div className='flex flex-col items-start justify-center sm:inline-block sm:flex-row sm:items-center sm:justify-between'>
            <div
              ref={initialFocusDiv}
              className='flex w-full flex-row justify-between sm:mb-1'>
              <TodoModalHeaderContents todo={todo}>{headerContents}</TodoModalHeaderContents>
              <div>
                {headerButtons}
                <TodoModalHeaderButtons todo={todo} />
              </div>
            </div>
            <div className='hidden sm:mb-2 sm:block'>
              <PlainLineDivider />
            </div>
            <div className='flex flex-row items-center sm:m-1 '>
              <CalendarDropdown
                options={{ tooltip: 'Due date' }}
                todo={todo}
                onClickConfirm={() => updateCalendarItem()}
              />
              <LabelComboBoxDropdown
                todo={todo}
                container={classNames(
                  isTodoModalMax ? 'w-full max-w-[85%]' : 'max-w-[32rem] md:w-[75%] w-[calc(70vw-2rem)]',
                )}
              />
            </div>
          </div>
          <div className='h-full w-full overflow-scroll '>
            <TodoEditors todo={todo} />
          </div>
          <div className='flex flex-row justify-end pt-4'>
            <CancelButton
              options={optionsButtonTodoModalCancel}
              onClick={() => closeModal()}>
              Cancel
            </CancelButton>
            {footerButtons ||
              (typeof todo === 'undefined' && (
                <DisableButton
                  isConditionalRendering={condition}
                  options={optionsButtonTodoModalAddTodo}
                  onClick={() => addTodo()}>
                  Add todo
                </DisableButton>
              ))}
          </div>
        </ModalTransitionChild>
      </ModalTransitionRoot>
      {children}
      <KeysWithTodoModalEffect todo={todo} />
      <DisableScrollEffect open={isTodoModalOpen} />
    </TodoModalFragment>
  );
};
