import { CATCH } from '@constAssertions/misc';
import {
  useFilterPathApp,
  useFilterPathHome,
  useInitialNavigation,
  useLayoutBodyTagClass,
  useLayoutType,
} from '@hooks/layouts';
import { LabelModal } from '@modals/labelModals/labelModal';
import { MinimizedModal } from '@modals/minimizedModal';
import { TodoModal } from '@modals/todoModals/todoModal';
import { atomCatch } from '@states/misc';
import { Notification } from 'components/notifications/notification';
import { useRecoilValue } from 'recoil';
import { GroupEffects } from './groupEffects';

export const LayoutHomeGroupEffects = () => {
  const path = 'home';
  const filterPath = useFilterPathHome();
  const setNavigation = useInitialNavigation({ path: path });
  const setLayoutType = useLayoutType({ path: path });
  const setBodyTagClass = useLayoutBodyTagClass({ path: path });

  return (
    <>
      <GroupEffects effects={[filterPath, setLayoutType, setNavigation, setBodyTagClass]} />
    </>
  );
};

export const LayoutAppGroupEffects = () => {
  const filterPath = useFilterPathApp();
  const setNavigation = useInitialNavigation({ path: 'app' });
  const setLayoutType = useLayoutType({ path: 'app' });
  const catchTodoModal = useRecoilValue(atomCatch(CATCH.todoModal));
  const setBodyTagClass = useLayoutBodyTagClass({ path: 'app' });

  return (
    <>
      <GroupEffects effects={[filterPath, setLayoutType, setNavigation, setBodyTagClass]} />
      <Notification />
      <TodoModal />
      <MinimizedModal />
      {!catchTodoModal && <LabelModal />}
    </>
  );
};
