import { CATCH } from '@constAssertions/misc';
import { TypesLayout } from '@layout/layout.types';
import { atomCatch } from '@states/misc';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

const FilterPathAppEffect = dynamic(() =>
  import('@layout/layoutEffects/filterPathAppEffect').then((mod) => mod.FilterPathAppEffect),
);
const InitialNavigationEffect = dynamic(() =>
  import('@layout/layoutEffects/initialNavigationEffect').then((mod) => mod.InitialNavigationEffect),
);
const LayoutTypeEffect = dynamic(() =>
  import('@layout/layoutEffects/layoutTypeEffect').then((mod) => mod.LayoutTypeEffect),
);
const BodyTagClassEffect = dynamic(() =>
  import('@layout/layoutEffects/bodyTagClassEffect').then((mod) => mod.BodyTagClassEffect),
);
const Notification = dynamic(() =>
  import('@components/notifications/notification').then((mod) => mod.Notification),
);
const TodoModal = dynamic(() => import('@modals/todoModals/todoModal').then((mod) => mod.TodoModal));
const MinimizedModal = dynamic(() => import('@modals/minimizedModal').then((mod) => mod.MinimizedModal));
const LabelModal = dynamic(() => import('@modals/labelModals/labelModal').then((mod) => mod.LabelModal));

export const LayoutAppLazy = ({ path }: Pick<TypesLayout, 'path'>) => {
  const catchTodoModal = useRecoilValue(atomCatch(CATCH.todoModal));

  return (
    <Suspense fallback={null}>
      <FilterPathAppEffect />
      <LayoutTypeEffect path={path} />
      <InitialNavigationEffect path={path} />
      <BodyTagClassEffect path={path} />
      <Notification />
      <TodoModal />
      <MinimizedModal />
      {!catchTodoModal && <LabelModal />}
    </Suspense>
  );
};
