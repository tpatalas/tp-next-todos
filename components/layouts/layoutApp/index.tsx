import { CATCH } from '@data/dataTypesConst';
import { Types } from '@lib/types';
import { atomHtmlTitleTag } from '@states/misc';
import { ClientStoragesResetEffect } from '@states/misc/clientStoragesResetEffect';
import { atomCatch } from '@states/utils';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  Fragment as FooterFragment,
  Fragment as HeaderFragment,
  Fragment as LayoutAppFragment,
  Fragment as ModalActionsFragment,
} from 'react';
import { useRecoilValue } from 'recoil';
const CreateTodoModal = dynamic(() => import('@modals/todoModals/todoModal').then((mod) => mod.TodoModal), {
  ssr: false,
});
const MinimizedModal = dynamic(() => import('@modals/minimizedModal').then((mod) => mod.MinimizedModal), {
  ssr: false,
});
const Notification = dynamic(() => import('components/notifications/notification').then((mod) => mod.Notification), {
  ssr: false,
});
const LabelModal = dynamic(() => import('@modals/labelModals/labelModal').then((mod) => mod.LabelModal), {
  ssr: false,
});
const WindowBeforeunloadEffect = dynamic(
  () => import('@states/misc/windowBeforeunloadEffect').then((mod) => mod.WindowBeforeunloadEffect),
  { ssr: false },
);
const Layout = dynamic(() => import('./layout').then((mod) => mod.Layout), { ssr: false });

type Props = Pick<Types, 'children'>;

export const LayoutApp = ({ children }: Props) => {
  const catchTodoModal = useRecoilValue(atomCatch(CATCH.todoModal));
  const slug = useRecoilValue(atomHtmlTitleTag);

  return (
    <LayoutAppFragment>
      <Head>
        <title>{'My Todo App: ' + slug}</title>
      </Head>
      <HeaderFragment>
        <Layout>{children}</Layout>
      </HeaderFragment>
      <FooterFragment>
        <Notification />
        <WindowBeforeunloadEffect />
        <ModalActionsFragment>
          <CreateTodoModal />
          <MinimizedModal />
          {!catchTodoModal && <LabelModal />}
        </ModalActionsFragment>
      </FooterFragment>
      <ClientStoragesResetEffect />
    </LayoutAppFragment>
  );
};
