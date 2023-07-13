import { TypesTodos } from '@components/todos/todos.types';
import { BREAKPOINT } from '@constAssertions/ui';
import { atomLayoutType, atomLayoutNavigationOpen } from '@layout/layout.states';
import { TypesNotification } from '@lib/types';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import { atomHtmlTitleTag } from '@states/misc';
import { atomLabelModalOpen, atomTodoModalMini, atomTodoModalOpen } from '@states/modals';
import { atomNotificationID, atomNotificationOpen } from '@states/notifications';
import { atomTodoNew } from '@states/todos';
import { useEffect } from 'react';
import { RecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export type PropsMockStateEffect<T> = {
  mediaQueryState?: boolean;
  isTodoModalOpen?: boolean;
  isMinimizedTodoModalOpen?: boolean;
  isLabelModalOpen?: boolean;
  notificationId?: TypesNotification['_id'];
  node?: RecoilState<T>;
};

export const MockLayoutAppLazyEffect = <T,>({
  mediaQueryState,
  notificationId,
  isTodoModalOpen,
  isMinimizedTodoModalOpen,
  isLabelModalOpen,
}: PropsMockStateEffect<T>) => {
  const layoutType = useRecoilValue(atomLayoutType);
  const htmlTitleTag = useRecoilValue(atomHtmlTitleTag);
  const isNavigationOpen = useRecoilValue(atomLayoutNavigationOpen('app'));
  const setMediaQuery = useSetRecoilState(atomEffectMediaQuery(BREAKPOINT['md']));
  const setNotificationId = useSetRecoilState(atomNotificationID);
  const setNotificationOpen = useSetRecoilState(atomNotificationOpen);
  const setTodoModalOpen = useSetRecoilState(atomTodoModalOpen(undefined));
  const setMinimizedTodoModalOpen = useSetRecoilState(atomTodoModalMini(undefined));
  const setTodoNew = useSetRecoilState(atomTodoNew);
  const setLabelModalOpen = useSetRecoilState(atomLabelModalOpen('201'));

  useEffect(() => {
    setMediaQuery(mediaQueryState ?? false);
    setNotificationId(notificationId ?? 'updatedTodo');
    !!notificationId && setNotificationOpen(true);
    setTodoModalOpen(isTodoModalOpen ?? false);
    setMinimizedTodoModalOpen(isMinimizedTodoModalOpen ?? false);
    !!isMinimizedTodoModalOpen && setTodoNew({ title: 'test-title' } as TypesTodos);
    setLabelModalOpen(isLabelModalOpen ?? false);
  }, [
    isLabelModalOpen,
    isMinimizedTodoModalOpen,
    isTodoModalOpen,
    mediaQueryState,
    notificationId,
    setLabelModalOpen,
    setMediaQuery,
    setMinimizedTodoModalOpen,
    setNotificationId,
    setNotificationOpen,
    setTodoModalOpen,
    setTodoNew,
  ]);

  return (
    <>
      <div>Layout Type: {layoutType}</div>
      <div>Html Title Tag: {htmlTitleTag}</div>
      <div>Navigation state: {isNavigationOpen ? 'true' : 'false'}</div>
    </>
  );
};
