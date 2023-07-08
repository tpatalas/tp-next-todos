import { NOTIFICATION } from '@constAssertions/ui';
import { atomNotificationID, atomNotificationOpen } from '@states/notifications';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

type Props = { isNotificationOpen: boolean; notificationID?: NOTIFICATION };

export const MockNotificationState = ({ isNotificationOpen, notificationID }: Props) => {
  const setNotificationOpen = useSetRecoilState(atomNotificationOpen);
  const setNotificationID = useSetRecoilState(atomNotificationID);

  useEffect(() => {
    setNotificationOpen(isNotificationOpen ?? false);
    !!notificationID && setNotificationID(notificationID);
  }, [isNotificationOpen, notificationID, setNotificationID, setNotificationOpen]);

  return null;
};
