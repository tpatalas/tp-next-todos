import { NOTIFICATION } from '@constAssertions/ui';
import { validateEmailFormat } from '@stateLogics/utils';
import {
  atomNotificationCounter,
  atomNotificationID,
  atomNotificationOpen,
} from '@states/notifications';
import { atomUser, atomUserErrorMessage } from '@states/users';
import { useRecoilCallback, useRecoilValue } from 'recoil';

export const useNotificationState = () => {
  const notification = useRecoilCallback(({ set, snapshot }) => (NotificationID: NOTIFICATION) => {
    const counter = snapshot.getLoadable(atomNotificationCounter).getValue();

    set(atomNotificationID, NotificationID);
    set(atomNotificationCounter, counter + 1);
    set(atomNotificationOpen, true);
  });
  return notification;
};

export const useClientErrorMessage = () => {
  const user = useRecoilValue(atomUser);
  const isEmailInValidated = !validateEmailFormat(user.email);

  return useRecoilCallback(({ reset }) => () => {
    !isEmailInValidated && reset(atomUserErrorMessage);
  });
};
