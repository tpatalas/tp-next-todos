import {
  useFilterPathApp,
  useFilterPathHome,
  useInitialNavigation,
  useLayoutNavigationMobileReset,
  useLayoutType,
} from '@hooks/layouts';
import { GroupEffects } from './groupEffects';
import dynamic from 'next/dynamic';
import { CATCH } from '@constAssertions/misc';
import { atomCatch } from '@states/misc';
import { useRecoilValue } from 'recoil';
import { TodoModal } from '@modals/todoModals/todoModal';
import { MinimizedModal } from '@modals/minimizedModal';
import { Notification } from 'components/notifications/notification';

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
      <TodoModal />
      <MinimizedModal />
      {!catchTodoModal && <LabelModal />}
    </>
  );
};

export const LayoutNavigationGroupEffect = () => {
  const mobileReset = useLayoutNavigationMobileReset();
  return (
    <>
      <GroupEffects effects={[mobileReset]} />
    </>
  );
};
