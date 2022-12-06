import { Types } from '@lib/types';
import { WindowBeforeunloadEffect } from '@states/Effects/windowBeforeunloadEffect';
import dynamic from 'next/dynamic';
import {
    Fragment as FooterFragment,
    Fragment as HeaderFragment,
    Fragment as LayoutAppFragment,
    Fragment as ModalActionsFragment
} from 'react';
import { LayoutSidebar } from './layoutSidebar';
const CreateTodoModal = dynamic(() =>
  import('@modals/todoModals/todoModal').then((mod) => mod.TodoModal),
);
const MinimizedModal = dynamic(() =>
  import('@modals/minimizedModal').then((mod) => mod.MinimizedModal),
);
const DiscardConfirmModal = dynamic(() =>
  import('@modals/confirmModal/discardConfirmModal').then(
    (mod) => mod.DiscardConfirmModal,
  ),
);
const Notification = dynamic(() =>
  import('components/notifications/notification').then(
    (mod) => mod.Notification,
  ),
);

type Props = Pick<Types, 'children'>;

export const LayoutApp = ({ children }: Props) => {

  return (
    <LayoutAppFragment>
      <HeaderFragment>
        <LayoutSidebar>
          {children}
        </LayoutSidebar>
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
    </LayoutAppFragment>
  );
};
