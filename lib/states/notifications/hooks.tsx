import { NOTIFICATION } from '@data/dataTypesConst';
import { useRecoilCallback } from 'recoil';
import { atomNotificationCounter, atomNotificationID, atomNotificationOpen } from '.';

/*
 * Hooks
 * */

export const useNotificationState = () => {
  const notification = useRecoilCallback(({ set, snapshot }) => (NotificationID: NOTIFICATION) => {
    const counter = snapshot.getLoadable(atomNotificationCounter).getValue();

    set(atomNotificationID, NotificationID);
    set(atomNotificationCounter, counter + 1);
    set(atomNotificationOpen, true);
  });
  return notification;
};
