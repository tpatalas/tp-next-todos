import { CATCH } from '@constAssertions/misc';
import {
  useFilterPathApp,
  useFilterPathHome,
  useInitialNavigation,
  useLayoutNavigationMobileReset,
  useLayoutBodyTagClass,
  useLayoutType,
} from '@hooks/layouts';
import { LabelModal } from '@modals/labelModals/labelModal';
import { atomCatch } from '@states/misc';
import { useRecoilValue } from 'recoil';
import { TodoModal } from '@modals/todoModals/todoModal';
import { MinimizedModal } from '@modals/minimizedModal';
import { Notification } from 'components/notifications/notification';
import { GroupEffects } from './groupEffects';

export const LayoutHomeGroupEffects = () => {
  const filterPath = useFilterPathHome();
  const setNavigation = useInitialNavigation({ layoutType: 'home' });
  const setLayoutType = useLayoutType({ layoutType: 'home' });
  const setBodyTagClass = useLayoutBodyTagClass({ layoutType: 'home' });

  return (
    <>
      <GroupEffects effects={[filterPath, setLayoutType, setNavigation, setBodyTagClass]} />
    </>
  );
};

export const LayoutAppGroupEffects = () => {
  const filterPath = useFilterPathApp();
  const setNavigation = useInitialNavigation({ layoutType: 'app' });
  const setLayoutType = useLayoutType({ layoutType: 'app' });
  const catchTodoModal = useRecoilValue(atomCatch(CATCH.todoModal));
  const setBodyTagClass = useLayoutBodyTagClass({ layoutType: 'app' });

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

export const LayoutNavigationGroupEffect = () => {
  const mobileReset = useLayoutNavigationMobileReset();
  return (
    <>
      <GroupEffects effects={[mobileReset]} />
    </>
  );
};
