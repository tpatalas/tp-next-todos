import {
  IconButton as CloseIconButton,
  IconButton as ExpandReversibleIconButton,
  IconButton as MinimizeIconButton,
} from '@buttons/iconButton';
import { dataButtonTodoModalClose, dataButtonTodoModalMinimize } from '@data/dataObjects';
import { BREAKPOINT } from '@data/dataTypesObjects';
import { ICON_CLOSE_FULL_SCREEN, ICON_OPEN_IN_FULL } from '@data/materialSymbols';
import { TodoItemDropdown } from '@dropdowns/todoItemDropdown';
import { Types } from '@lib/types';
import { atomMediaQuery } from '@states/misc';
import { atomTodoModalMax } from '@states/modals';
import {
  useTodoModalStateMinimize,
  useTodoModalStateExpand,
  useTodoModalStateClose,
} from '@states/modals/hooks';
import {
  Fragment as ContainerFragment,
  Fragment as HeaderFragment,
  Fragment as HeaderButtonFragment,
} from 'react';
import { isMacOs } from 'react-device-detect';
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
              data={{ isInitiallyVisible: true }}
              todo={todo}
            />
          )}
          <HeaderButtonFragment>
            {typeof todo === 'undefined' && (
              <MinimizeIconButton
                data={dataButtonTodoModalMinimize}
                onClick={() => minimizeModal()}
              />
            )}
            <ExpandReversibleIconButton
              onClick={() => expandModal()}
              data={{
                path: !isTodoModalMax ? ICON_OPEN_IN_FULL : ICON_CLOSE_FULL_SCREEN,
                tooltip: !isTodoModalMax ? 'Expand' : 'Exit expand',
                kbd: isMacOs ? '⌘ E' : 'Ctrl E',
              }}
            />
          </HeaderButtonFragment>
        </HeaderFragment>
      )}
      <CloseIconButton
        data={dataButtonTodoModalClose}
        onClick={() => closeModal()}
      />
    </ContainerFragment>
  );
};
