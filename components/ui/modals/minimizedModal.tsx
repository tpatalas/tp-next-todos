import {
  IconButton as CloseIconButton,
  IconButton as MaxIconButton,
  IconButton as OpenFullIconButton,
} from '@buttons/iconButton';
import { atomTodoModalMini } from '@states/modals';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { MinimizeModalTransition } from './modal/modalTransition/minimizeModalTransition';
import { BREAKPOINT } from '@constAssertions/ui';
import {
  optionsButtonMiniModalMaximize,
  optionsButtonMiniModalOpenFull,
  optionsButtonGlobalClose,
} from '@options/button';
import { optionsMinimizedModal } from '@options/misc';
import { ModalStateOnBreakpointEffect } from '@effects/modalStateOnBreakpointEffect';
import {
  useTodoModalStateClose,
  useTodoModalStateMaximize,
  useTodoModalStateExitMinimize,
} from '@hooks/modals';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import { TypesTodo } from '@components/todos/todos.types';
import { atomTodoNew } from '@components/todos/todos.states';

type Props = Partial<Pick<TypesTodo, 'todo'>>;

export const MinimizedModal = ({ todo }: Props) => {
  const isTodoModalMiniOpen = useRecoilValue(atomTodoModalMini(todo?._id));
  const closeModal = useTodoModalStateClose(todo?._id);
  const maximizeModal = useTodoModalStateMaximize(todo?._id);
  const exitMinimizeModal = useTodoModalStateExitMinimize(todo?._id);
  const newTodo = useRecoilValue(atomTodoNew);
  const isMediaQuerySmall = useRecoilValue(atomEffectMediaQuery(BREAKPOINT['sm']));

  return (
    <Fragment>
      {isMediaQuerySmall && (
        <MinimizeModalTransition
          show={isTodoModalMiniOpen}
          options={optionsMinimizedModal}
        >
          <div className=' flex flex-shrink-0 flex-row items-center justify-between'>
            <div className='flex flex-1 flex-col justify-center'>
              <p className='line-clamp-1 w-44 break-words text-sm font-medium text-gray-500'>
                {newTodo.title}
              </p>
            </div>
            <div className='flex h-fit flex-row'>
              <MaxIconButton
                options={optionsButtonMiniModalMaximize}
                onClick={() => exitMinimizeModal()}
              />
              <OpenFullIconButton
                options={optionsButtonMiniModalOpenFull}
                onClick={() => maximizeModal()}
              />
              <CloseIconButton
                options={optionsButtonGlobalClose}
                onClick={() => closeModal()}
              />
            </div>
          </div>
          <div>
            <p className='line-clamp-3 w-64 break-words text-sm text-gray-400'>{newTodo.note}</p>
          </div>
          <ModalStateOnBreakpointEffect />
        </MinimizeModalTransition>
      )}
    </Fragment>
  );
};
