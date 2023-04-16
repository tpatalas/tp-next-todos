import { CATCH } from '@constAssertions/misc';
import { Types } from '@lib/types';
import { atomCatch, atomHtmlTitleTag } from '@states/misc';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  Fragment as FooterFragment,
  Fragment as HeaderFragment,
  Fragment as LayoutAppFragment,
  Fragment as ModalActionsFragment,
} from 'react';
import { useRecoilValue } from 'recoil';
const CreateTodoModal = dynamic(() => import('@modals/todoModals/todoModal').then((mod) => mod.TodoModal));
const MinimizedModal = dynamic(() => import('@modals/minimizedModal').then((mod) => mod.MinimizedModal));
const Notification = dynamic(() => import('components/notifications/notification').then((mod) => mod.Notification));
const LabelModal = dynamic(() => import('@modals/labelModals/labelModal').then((mod) => mod.LabelModal));
const WindowBeforeunloadEffect = dynamic(() =>
  import('@effects/windowBeforeunloadEffect').then((mod) => mod.WindowBeforeunloadEffect),
);
const Layout = dynamic(() => import('./layout').then((mod) => mod.Layout));

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
    </LayoutAppFragment>
  );
};