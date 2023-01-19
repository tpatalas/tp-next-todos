import { useEffect } from 'react';
import { useRecoilCallback, useResetRecoilState } from 'recoil';
import { atomNotificationOpen, atomNotificationCounter } from '.';

export const NotificationResetEffect = () => {
  const resetNotification = useResetRecoilState(atomNotificationOpen);
  const resetCount = useResetRecoilState(atomNotificationCounter);
  const counter = useRecoilCallback(({ snapshot }) => () => {
    return snapshot.getLoadable(atomNotificationCounter).getValue() * 1000;
  });

  useEffect(() => {
    const timeoutID = setTimeout(
      () => {
        resetNotification();
        resetCount();
      },
      counter() < 5000 ? 5000 : counter() || counter() > 15000 ? 15000 : counter(),
    );
    return () => {
      clearTimeout(timeoutID);
    };
  }, [counter, resetCount, resetNotification]);

  return null;
};
