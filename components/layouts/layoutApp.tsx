import { DisableButton } from '@buttons/disableButton';
import { Div as DivButton, Div as DivConditionalButton } from '@containers/div';
import { dataButtonCreateTodo } from '@data/dataObjects';
import { useModalStateOpen } from '@hooks/useModals';
import { Types } from '@lib/types';
import { WindowBeforeunloadEffect } from '@states/Effects/windowBeforeunloadEffect';
import dynamic from 'next/dynamic';
import {
  Fragment as FooterFragment,
  Fragment as HeaderFragment,
  Fragment as LayoutFragment,
  Fragment as ModalActionsFragment,
} from 'react';
const CreateTodoModal = dynamic(() =>
  import('@modals/todoModals/todoModal').then((mod) => mod.TodoModal),
);
const MinimizedModal = dynamic(() =>
  import('@modals/minimizedModal').then((mod) => mod.MinimizedModal),
);
const DiscardConfirmModal = dynamic(() =>
  import('@modals/confirmModal/discardConfirmModal').then((mod) => mod.DiscardConfirmModal),
);
const Notification = dynamic(() =>
  import('components/notifications/notification').then((mod) => mod.Notification),
);

type Props = Pick<Types, 'children'>;

export const LayoutApp = ({ children }: Props) => {
  const openModal = useModalStateOpen(undefined);

  return (
    <LayoutFragment>
      <HeaderFragment>
        <DivButton className='flex flex-row justify-center'>
          <DivConditionalButton className='mb-5'>
            <DisableButton
              data={dataButtonCreateTodo}
              onClick={() => openModal()}>
              Create Todo
            </DisableButton>
          </DivConditionalButton>
        </DivButton>
        {children}
      </HeaderFragment>
      <FooterFragment>
        <Notification />
        <WindowBeforeunloadEffect />
        <ModalActionsFragment>
          <CreateTodoModal />
          <DiscardConfirmModal />
          <MinimizedModal />
        </ModalActionsFragment>
      </FooterFragment>
    </LayoutFragment>
  );
};
