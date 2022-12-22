import { DisableButton } from '@buttons/disableButton';
import { TodoEditors } from '@components/editors/todoEditor';
import { dataButtonTodoModalAddTodo, dataButtonTodoModalCancel } from '@data/dataObjects';
import { CalendarDropdown } from '@dropdowns/calendarDropdown';
import { AnyModalWithKeyEffect } from '@effects/anyModalWithKeyEffect';
import { classNames } from '@lib/utils';
import { TodoModalHeaderButtons } from '@modals/todoModals/todoModal/todoModalHeaderButtons';
import { useCalUpdateItem } from '@states/calendarStates';
import { atomTodoModalOpen, atomTodoModalMax, useModalStateClose } from '@states/modalStates';
import { useTodoStateAdd } from '@states/todoStates';
import { Types } from 'lib/types';
import { Fragment as TodoModalFragment, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Button as CancelButton } from '../../../buttons/button';
import { Divider as PlainLineDivider } from '../../../dividers/divider';
import { ModalTransitionChild } from '../../modal/modalTransition/modalTransitionChild';
import { ModalTransitionRoot } from '../../modal/modalTransition/modalTransitionRoot';
import { TodoModalHeaderContents } from './todoModalHeaderContents';

type Props = Partial<
  Pick<Types, 'todo' | 'children' | 'headerContents' | 'footerButtons' | 'headerButtons'>
>;

export const TodoModal = ({
  todo,
  headerContents,
  headerButtons,
  footerButtons,
  children,
}: Props) => {
  const isTodoModalOpen = useRecoilValue(atomTodoModalOpen(todo?._id));
  const isTodoModalMax = useRecoilValue(atomTodoModalMax(todo?._id));
  const closeModal = useModalStateClose(todo?._id);
  const initialFocusDiv = useRef<HTMLDivElement>(null);
  const updateCalendarItem = useCalUpdateItem(todo?._id);
  const addTodo = useTodoStateAdd();

  return (
    <TodoModalFragment>
      <ModalTransitionRoot
        show={isTodoModalOpen}
        initialFocus={initialFocusDiv}
        onClose={() => closeModal()}>
        <ModalTransitionChild
          className={classNames(
            'h-80 min-h-[20rem] px-4 pt-2 pb-5 sm:relative',
            isTodoModalMax
              ? 'sm:bottom-0 sm:h-full sm:max-h-[44rem] sm:max-w-3xl md:max-h-[54rem] md:max-w-5xl lg:max-w-6xl'
              : 'sm:bottom-20 sm:h-[28rem] sm:max-w-2xl',
          )}>
          <div className='flex flex-row items-center justify-between sm:inline-block'>
            <div
              ref={initialFocusDiv}
              className='flex flex-row justify-between sm:mb-1'>
              <TodoModalHeaderContents todo={todo}>{headerContents}</TodoModalHeaderContents>
              <div>
                {headerButtons}
                <TodoModalHeaderButtons todo={todo} />
              </div>
            </div>
            <div className='hidden sm:mb-2 sm:block'>
              <PlainLineDivider />
            </div>
            <div className='m-1 sm:flex'>
              <CalendarDropdown
                data={{ tooltip: 'Due Date' }}
                todo={todo}
                onClickConfirm={() => updateCalendarItem()}
              />
            </div>
          </div>
          <div className='h-full w-full overflow-scroll '>
            <TodoEditors todo={todo} />
          </div>
          <div className='flex flex-row justify-end pt-4'>
            <CancelButton
              data={dataButtonTodoModalCancel}
              onClick={() => closeModal()}>
              Cancel
            </CancelButton>
            {footerButtons ||
              (typeof todo === 'undefined' && (
                <DisableButton
                  data={dataButtonTodoModalAddTodo}
                  onClick={() => addTodo()}>
                  Add Todo
                </DisableButton>
              ))}
          </div>
        </ModalTransitionChild>
      </ModalTransitionRoot>
      {children}
      <AnyModalWithKeyEffect todo={todo} />
    </TodoModalFragment>
  );
};
