import { CATCH } from '@constAssertions/misc';
import { FooterBody } from '@layouts/layoutFooter/footerBody';
import { LayoutHeader } from '@layouts/layoutHeader';
import { SearchBar } from '@layouts/layoutHeader/searchBar';
import { SidebarButton } from '@layouts/layoutHeader/sidebarButton';
import { Types } from '@lib/types';
import { atomCatch, atomHtmlTitleTag } from '@states/misc';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  Fragment as FooterFragment,
  Fragment as HeaderFragment,
  Fragment as LayoutAppFragment,
  Fragment as ModalActionsFragment,
  Suspense,
} from 'react';
import { useRecoilValue } from 'recoil';
import { AppSidebarContent } from './appSidebarContent';
import { SidebarInitialEffect } from '@effects/sidebarInitialEffect';
const CreateTodoModal = dynamic(() => import('@modals/todoModals/todoModal').then((mod) => mod.TodoModal));
const MinimizedModal = dynamic(() => import('@modals/minimizedModal').then((mod) => mod.MinimizedModal));
const Notification = dynamic(() => import('components/notifications/notification').then((mod) => mod.Notification));
const LabelModal = dynamic(() => import('@modals/labelModals/labelModal').then((mod) => mod.LabelModal));
const WindowBeforeunloadEffect = dynamic(() =>
  import('@effects/windowBeforeunloadEffect').then((mod) => mod.WindowBeforeunloadEffect),
);
const LayoutFooter = dynamic(() => import('@layouts/layoutFooter').then((mod) => mod.LayoutFooter), {
  ssr: false,
});
const User = dynamic(() => import('@layouts/layoutHeader/user').then((mod) => mod.User), { ssr: false });

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
        <div className='flex h-screen flex-col'>
          <LayoutHeader sidebarButton={<SidebarButton />}>
            <SearchBar />
            <Suspense>
              <User />
            </Suspense>
          </LayoutHeader>
          <Suspense>
            <LayoutFooter footerSidebar={<AppSidebarContent />}>
              <FooterBody>{children}</FooterBody>
            </LayoutFooter>
          </Suspense>
        </div>
      </HeaderFragment>
      <FooterFragment>
        <SidebarInitialEffect />
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
