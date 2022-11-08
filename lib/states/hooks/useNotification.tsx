import { NOTIFICATION } from '@lib/data/stateObjects';
import {
  atomNotificationCounter,
  atomNotificationID,
  atomNotificationOpen,
} from '@states/atoms';
import { useRecoilCallback } from 'recoil';

export const useNotificationState = () => {
  const notification = useRecoilCallback(
    ({ set, snapshot }) =>
      (NotificationID: NOTIFICATION) => {
        const counter = snapshot
          .getLoadable(atomNotificationCounter)
          .getValue();

        set(atomNotificationID, NotificationID);
        set(atomNotificationCounter, counter + 1);
        set(atomNotificationOpen, true);
      }
  );
  return notification;
};
