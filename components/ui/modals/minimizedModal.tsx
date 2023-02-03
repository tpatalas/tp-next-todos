import {
  IconButton as CloseIconButton,
  IconButton as MaxIconButton,
  IconButton as OpenFullIconButton,
} from '@buttons/iconButton';
import {
  optionsMinimizedModal,
  optionsButtonMiniModalMaximize,
  optionsButtonMiniModalOpenFull,
  optionsButtonGlobalClose,
} from '@data/dataOptions';
import { atomTodoModalMini } from '@states/modals';
import { useTodoModalStateClose, useTodoModalStateMaximize, useTodoModalStateExitMinimize } from '@states/modals/hooks';
import { ModalStateOnBreakpointEffect } from '@states/modals/modalStateOnBreakpointEffect';
import { atomTodoNew } from '@states/todos';
import { TypesTodo } from 'lib/types';
import { useRecoilValue } from 'recoil';
import { MinimizeModalTransition } from './modal/modalTransition/minimizeModalTransition';

type Props = Partial<Pick<TypesTodo, 'todo'>>;

export const MinimizedModal = ({ todo }: Props) => {
  const isTodoModalMiniOpen = useRecoilValue(atomTodoModalMini(todo?._id));
  const closeModal = useTodoModalStateClose(todo?._id);
  const maximizeModal = useTodoModalStateMaximize(todo?._id);
  const exitMinimizeModal = useTodoModalStateExitMinimize(todo?._id);
  const newTodo = useRecoilValue(atomTodoNew);

  return (
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
  );
};
