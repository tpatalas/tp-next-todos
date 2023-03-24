import {
  IconButton as CloseIconButton,
  IconButton as MaxIconButton,
  IconButton as OpenFullIconButton,
} from '@buttons/iconButton';
import { atomMediaQuery } from '@states/misc';
import { atomTodoModalMini } from '@states/modals';
import { atomTodoNew } from '@states/todos';
import { TypesTodo } from 'lib/types';
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
import { useTodoModalStateClose, useTodoModalStateMaximize, useTodoModalStateExitMinimize } from '@hooks/modals';

type Props = Partial<Pick<TypesTodo, 'todo'>>;

export const MinimizedModal = ({ todo }: Props) => {
  const isTodoModalMiniOpen = useRecoilValue(atomTodoModalMini(todo?._id));
  const closeModal = useTodoModalStateClose(todo?._id);
  const maximizeModal = useTodoModalStateMaximize(todo?._id);
  const exitMinimizeModal = useTodoModalStateExitMinimize(todo?._id);
  const newTodo = useRecoilValue(atomTodoNew);
  const isMediaQuerySmall = useRecoilValue(atomMediaQuery(BREAKPOINT['sm']));

  return (
    <Fragment>
      {isMediaQuerySmall && (
        <MinimizeModalTransition
          show={isTodoModalMiniOpen}
          options={optionsMinimizedModal}>
          <div className=' flex flex-shrink-0 flex-row items-center justify-between'>
            <div className='flex flex-1 flex-col justify-center'>
              <p className='w-44 break-words text-sm font-medium text-gray-500 line-clamp-1'>{newTodo.title}</p>
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
            <p className='w-64 break-words text-sm text-gray-400 line-clamp-3'>{newTodo.note}</p>
          </div>
          <ModalStateOnBreakpointEffect />
        </MinimizeModalTransition>
      )}
    </Fragment>
  );
};
