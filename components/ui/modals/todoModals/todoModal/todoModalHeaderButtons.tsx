import {
  IconButton as CloseIconButton,
  IconButton as ExpandReversibleIconButton,
  IconButton as MinimizeIconButton,
} from '@buttons/iconButton';
import { optionsButtonTodoModalClose, optionsButtonTodoModalMinimize } from '@data/dataOptions';
import { BREAKPOINT, MODIFIER_KBD } from '@data/dataTypesConst';
import { ICON_CLOSE_FULL_SCREEN, ICON_OPEN_IN_FULL } from '@data/materialSymbols';
import { TodoItemDropdown } from '@dropdowns/v1/todoItemDropdown';
import { Types } from '@lib/types';
import { atomMediaQuery } from '@states/misc';
import { atomTodoModalMax } from '@states/modals';
import { useTodoModalStateClose, useTodoModalStateExpand, useTodoModalStateMinimize } from '@states/modals/hooks';
import { Fragment as ContainerFragment, Fragment as HeaderButtonFragment, Fragment as HeaderFragment } from 'react';
import { useRecoilValue } from 'recoil';

type Props = Partial<Pick<Types, 'todo'>>;

export const TodoModalHeaderButtons = ({ todo }: Props) => {
  const minimizeModal = useTodoModalStateMinimize(todo?._id);
  const expandModal = useTodoModalStateExpand(todo?._id);
  const isTodoModalMax = useRecoilValue(atomTodoModalMax(todo?._id));
  const onBreakpointSm = useRecoilValue(atomMediaQuery(BREAKPOINT['sm']));
  const closeModal = useTodoModalStateClose(todo?._id);

  return (
    <ContainerFragment>
      {onBreakpointSm && (
        <HeaderFragment>
          {typeof todo !== 'undefined' && (
            <TodoItemDropdown
              options={{ menuHeight: 'mt-0', isInitiallyVisible: true }}
              todo={todo}
            />
          )}
          <HeaderButtonFragment>
            {typeof todo === 'undefined' && (
              <MinimizeIconButton
                options={optionsButtonTodoModalMinimize}
                onClick={() => minimizeModal()}
              />
            )}
            <ExpandReversibleIconButton
              onClick={() => expandModal()}
              options={{
                path: !isTodoModalMax ? ICON_OPEN_IN_FULL : ICON_CLOSE_FULL_SCREEN,
                tooltip: !isTodoModalMax ? 'Expand' : 'Exit expand',
                kbd: MODIFIER_KBD['modifier + E'],
              }}
            />
          </HeaderButtonFragment>
        </HeaderFragment>
      )}
      <CloseIconButton
        options={optionsButtonTodoModalClose}
        onClick={() => closeModal()}
      />
    </ContainerFragment>
  );
};
