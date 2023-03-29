import { CATCH } from '@constAssertions/misc';
import { LayoutTypeEffect } from '@effects/layoutTypeEffect';
import { NavigationInitialEffect } from '@effects/navigationInitialEffect';
import { FooterBody } from '@layouts/layoutFooter/footerBody';
import { LayoutHeader } from '@layouts/layoutHeader';
import { SearchBar } from '@layouts/layoutHeader/searchBar';
import { Types } from '@lib/types';
import { atomCatch, atomHtmlTitleTag } from '@states/misc';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  Fragment as EffectFragment,
  Fragment as HeaderFragment,
  Fragment as LayoutAppFragment,
  Fragment as ModalActionsFragment,
  Suspense,
} from 'react';
import { useRecoilValue } from 'recoil';
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
          <LayoutHeader layoutType='app'>
            <SearchBar />
            <Suspense>
              <User />
            </Suspense>
          </LayoutHeader>
          <Suspense>
            <LayoutFooter layoutType='app'>
              <FooterBody>{children}</FooterBody>
            </LayoutFooter>
          </Suspense>
        </div>
      </HeaderFragment>
      <EffectFragment>
        <LayoutTypeEffect layoutType='app' />
        <NavigationInitialEffect layoutType='app' />
        <Notification />
        <WindowBeforeunloadEffect />
        <ModalActionsFragment>
          <CreateTodoModal />
          <MinimizedModal />
          {!catchTodoModal && <LabelModal />}
        </ModalActionsFragment>
      </EffectFragment>
    </LayoutAppFragment>
  );
};
