import { DisableButton } from '@buttons/disableButton';
import { TodoEditors } from '@components/editor/todoEditor';
import { CalendarDropdown } from '@dropdowns/v1/calendarDropdown';
import { LabelComboBoxDropdown } from '@dropdowns/v1/labelComboBoxDropdown';
import { DeleteTodoConfirmModal } from '@modals/confirmModal/deleteConfirmModal/deleteTodoConfirmModal';
import { DiscardConfirmModal } from '@modals/confirmModal/discardConfirmModal';
import { LabelModal } from '@modals/labelModals/labelModal';
import { TodoModalHeaderButtons } from '@modals/todoModals/todoModal/todoModalHeaderButtons';
import { atomTodoModalMax, atomTodoModalOpen } from '@states/modals';
import { Types } from 'lib/types';
import { Fragment as TodoModalFragment, useRef } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { Button as CancelButton } from '../../../buttons/button';
import { ModalTransitionChild } from '../../modal/modalTransition/modalTransitionChild';
import { ModalTransitionRoot } from '../../modal/modalTransition/modalTransitionRoot';
import { TodoModalHeaderContents } from './todoModalHeaderContents';
import { optionsButtonTodoModalCancel, optionsButtonTodoModalAddTodo } from '@options/button';
import { useCalUpdateItem } from '@hooks/calendar';
import { useConditionCheckTodoTitleEmpty } from '@hooks/misc';
import { useTodoModalStateClose } from '@hooks/modals';
import { useTodoAdd } from '@hooks/todos';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import { DisableScrollEffect } from '@effects/disableScrollEffect';
import { KeysWithTodoModalEffect } from '@effects/keysWithTodoModalEffect';
import { classNames } from '@stateLogics/utils';
import { DividerX } from '@ui/dividers/dividerX';

type Props = Partial<
  Pick<Types, 'todo' | 'children' | 'menuButtonContent' | 'footerButtons' | 'headerButtons'>
>;

export const TodoModal = ({ todo, menuButtonContent, headerButtons, footerButtons, children }: Props) => {
  const isTodoModalOpen = useRecoilValue(atomTodoModalOpen(todo?._id));
  const isTodoModalMax = useRecoilValue(atomTodoModalMax(todo?._id));
  const closeModal = useTodoModalStateClose(todo?._id);
  const initialFocusDiv = useRef<HTMLDivElement>(null);
  const updateCalendarItem = useCalUpdateItem(todo?._id);
  const addTodo = useTodoAdd();
  const condition = useConditionCheckTodoTitleEmpty();
  const isTodoCompleted = useRecoilCallback(({ snapshot }) => () => {
    return (
      typeof todo !== 'undefined' &&
      snapshot.getLoadable(selectorSessionTodoItem(todo._id)).getValue().completed
    );
  });

  return (
    <TodoModalFragment>
      <ModalTransitionRoot
        show={isTodoModalOpen}
        initialFocus={initialFocusDiv}
        onClose={() => closeModal()}
      >
        {/* nested modal */}
        <LabelModal label={undefined} />
        <DiscardConfirmModal todo={todo} />
        {typeof todo !== 'undefined' && <DeleteTodoConfirmModal todo={todo} />}
        <ModalTransitionChild
          className={classNames(
            'h-[28rem] px-4 pb-7 pt-2 sm:relative',
            isTodoModalMax
              ? 'sm:bottom-0 sm:h-full sm:max-h-[90vh] sm:max-w-[90vw] xl:max-w-6xl'
              : 'sm:max-h-[28rem] sm:max-w-2xl md:bottom-[calc(23vh-6rem)]',
          )}
        >
          <div className='flex flex-col items-start justify-center sm:inline-block sm:flex-row sm:items-center sm:justify-between'>
            <div
              ref={initialFocusDiv}
              className='flex w-full flex-row justify-between will-change-transform sm:mb-1'
            >
              <TodoModalHeaderContents todo={todo}>{menuButtonContent}</TodoModalHeaderContents>
              <div className='will-change-transform'>
                {headerButtons}
                <TodoModalHeaderButtons todo={todo} />
              </div>
            </div>
            <div className='hidden will-change-transform sm:mb-2 sm:block'>
              <DividerX />
            </div>
            <div className='relative z-50 flex flex-row items-center will-change-transform sm:m-1'>
              <CalendarDropdown
                options={{
                  tooltip: 'Due date',
                  borderRadius: 'rounded-lg',
                  container: isTodoCompleted() ? 'cursor-not-allowed select-none opacity-50' : '',
                }}
                todo={todo}
                onClickConfirm={() => updateCalendarItem()}
              />
              <LabelComboBoxDropdown
                todo={todo}
                container={classNames(
                  isTodoModalMax
                    ? 'w-full max-w-[85%]'
                    : 'max-w-[32rem] sm:w-[calc(100%-9rem)] xs:w-[calc(75vw-4rem)] 2xs:w-[calc(75vw-6rem)] w-[calc(75vw-7rem)]',
                )}
              />
            </div>
          </div>
          <div className='h-full w-full overflow-scroll will-change-transform'>
            <TodoEditors todo={todo} />
          </div>
          <div className='flex flex-row justify-end pt-4 will-change-transform'>
            <CancelButton
              options={optionsButtonTodoModalCancel}
              onClick={() => closeModal()}
            >
              Cancel
            </CancelButton>
            {footerButtons ||
              (typeof todo === 'undefined' && (
                <DisableButton
                  isConditionalRendering={condition}
                  options={optionsButtonTodoModalAddTodo}
                  onClick={() => addTodo()}
                >
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
