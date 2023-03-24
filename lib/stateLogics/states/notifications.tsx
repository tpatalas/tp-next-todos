import { DATA_NOTIFICATION } from '@collections/notification';
import { TypesNotification } from '@lib/types';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';

/**
 * Atoms
 */
export const atomNotificationOpen = atom({
  key: 'atomNotificationOpen',
  default: false,
});

export const atomNotificationCounter = atom({
  key: 'atomNotificationCounter',
  default: 0,
});

export const atomNotificationID = atom<TypesNotification['_id']>({
  key: 'atomNotificationID',
  default: undefined,
});

export const atomNotificationData = atom<TypesNotification[]>({
  key: 'atomNotificationData',
  default: DATA_NOTIFICATION,
});

export const atomNotificationDataItem = atomFamily({
  key: 'atomNotificationDataItem',
  default: selectorFamily({
    key: 'selectorAtomNOtificationData',
    get:
      (_id) =>
      ({ get }) =>
        get(atomNotificationData).find((notification) => notification._id === _id)! || {},
    cachePolicy_UNSTABLE: {
      eviction: 'most-recent',
    },
  }),
});

/* Selector */
export const selectorNotificationState = selector<TypesNotification>({
  key: 'selectorNotificationState',
  get: ({ get }) => get(atomNotificationDataItem(get(atomNotificationID))),
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});
