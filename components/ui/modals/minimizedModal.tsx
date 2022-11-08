import {
  IconButton as CloseIconButton,
  IconButton as MaxIconButton,
  IconButton as OpenFullIconButton,
} from '@buttons/iconButton';
import {
  Div as DivDescription,
  Div as DivHeader,
  Div as DivHeaderIcon,
  Div as DivTitle,
} from '@containers/div';
import { Para as ParaDescription, Para as ParaTitle } from '@containers/para';
import {
  dataButtonGlobalClose,
  dataButtonMiniModalMaximize,
  dataButtonMiniModalOpenFull,
  dataMinimizedModal,
} from '@data/dataObjects';
import { ModalStateOnBreakpointEffect } from '@states/Effects/modalStateOnBreakpointEffect';
import { atomTodoModalMini } from 'lib/states/atoms';
import { atomTodoNew } from 'lib/states/atoms/atomTodos';
import {
  useModalStateClose,
  useModalStateExitMinimize,
  useModalStateMaximize,
} from 'lib/states/hooks/useModals';
import { TypesTodo } from 'lib/types';
import { useRecoilValue } from 'recoil';
import { MinimizeModalTransition } from './modal/modalTransition/minimizeModalTransition';

type Props = Partial<Pick<TypesTodo, 'todo'>>;

export const MinimizedModal = ({ todo }: Props) => {
  const isTodoModalMiniOpen = useRecoilValue(atomTodoModalMini(todo?._id));
  const closeModal = useModalStateClose(todo?._id);
  const maximizeModal = useModalStateMaximize(todo?._id);
  const exitMinimizeModal = useModalStateExitMinimize(todo?._id);
  const newTodo = useRecoilValue(atomTodoNew);

  return (
    <MinimizeModalTransition
      show={isTodoModalMiniOpen}
      data={dataMinimizedModal}>
      <DivHeader className=' flex flex-shrink-0 flex-row items-center justify-between'>
        <DivTitle className='flex flex-1 flex-col justify-center'>
          <ParaTitle className='w-44 break-words text-sm font-medium text-gray-500 line-clamp-1'>
            {newTodo.title}
          </ParaTitle>
        </DivTitle>
        <DivHeaderIcon className='flex h-fit flex-row'>
          <MaxIconButton
            data={dataButtonMiniModalMaximize}
            onClick={() => exitMinimizeModal()}
          />
          <OpenFullIconButton
            data={dataButtonMiniModalOpenFull}
            onClick={() => maximizeModal()}
          />
          <CloseIconButton
            data={dataButtonGlobalClose}
            onClick={() => closeModal()}
          />
        </DivHeaderIcon>
      </DivHeader>
      <DivDescription>
        <ParaDescription className='w-64 break-words text-sm text-gray-400 line-clamp-3'>
          {newTodo.note}
        </ParaDescription>
      </DivDescription>
      <ModalStateOnBreakpointEffect />
    </MinimizeModalTransition>
  );
};
