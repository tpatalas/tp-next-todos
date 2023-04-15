import { CATCH } from '@constAssertions/misc';
import {
  useFilterPathApp,
  useFilterPathHome,
  useInitialNavigation,
  useLayoutBodyTagClass,
  useLayoutNavigationMobileReset,
  useLayoutType,
} from '@hooks/layouts';
import { LabelModal } from '@modals/labelModals/labelModal';
import { MinimizedModal } from '@modals/minimizedModal';
import { TodoModal } from '@modals/todoModals/todoModal';
import { atomNavigationOpenMobile } from '@states/layouts';
import { atomCatch } from '@states/misc';
import { Notification } from 'components/notifications/notification';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { GroupEffects } from './groupEffects';

export const LayoutHomeGroupEffects = () => {
  const layoutType = 'home';
  const filterPath = useFilterPathHome();
  const setNavigation = useInitialNavigation({ layoutType: layoutType });
  const setLayoutType = useLayoutType({ layoutType: layoutType });
  const setBodyTagClass = useLayoutBodyTagClass({ layoutType: layoutType });
  const restSidebarOpen = useResetRecoilState(atomNavigationOpenMobile(layoutType));

  return (
    <>
      <GroupEffects
        effects={[filterPath, setLayoutType, setNavigation, setBodyTagClass, restSidebarOpen]}
      />
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
