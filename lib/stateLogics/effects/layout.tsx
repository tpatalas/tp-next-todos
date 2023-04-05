import {
  useFilterPathApp,
  useFilterPathHome,
  useInitialNavigation,
  useLayoutType,
} from '@hooks/layouts';
import { GroupEffects } from './groupEffects';
import dynamic from 'next/dynamic';
import { CATCH } from '@constAssertions/misc';
import { atomCatch } from '@states/misc';
import { useRecoilValue } from 'recoil';

const CreateTodoModal = dynamic(() =>
  import('@modals/todoModals/todoModal').then((mod) => mod.TodoModal),
);
const MinimizedModal = dynamic(() =>
  import('@modals/minimizedModal').then((mod) => mod.MinimizedModal),
);
const Notification = dynamic(() =>
  import('components/notifications/notification').then((mod) => mod.Notification),
);
const LabelModal = dynamic(() =>
  import('@modals/labelModals/labelModal').then((mod) => mod.LabelModal),
);

export const LayoutHomeGroupEffects = () => {
  const filterPath = useFilterPathHome();
  const setNavigation = useInitialNavigation({ layoutType: 'home' });
  const setLayoutType = useLayoutType({ layoutType: 'home' });

  return (
    <>
      <GroupEffects effects={[filterPath, setLayoutType, setNavigation]} />
    </>
  );
};

export const LayoutAppGroupEffects = () => {
  const filterPath = useFilterPathApp();
  const setNavigation = useInitialNavigation({ layoutType: 'app' });
  const setLayoutType = useLayoutType({ layoutType: 'app' });
  const catchTodoModal = useRecoilValue(atomCatch(CATCH.todoModal));

  return (
    <>
      <GroupEffects effects={[filterPath, setLayoutType, setNavigation]} />
      <Notification />
      <CreateTodoModal />
      <MinimizedModal />
      {!catchTodoModal && <LabelModal />}
    </>
  );
};
