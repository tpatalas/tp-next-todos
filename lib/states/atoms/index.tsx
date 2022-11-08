import { DATA_NOTIFICATION } from '@lib/data/stateArrayObjects';
import { BREAKPOINT, CATCH_MODAL, PRIORITY_LEVEL } from '@lib/data/stateObjects';
import { Todos, TypesNotification } from '@lib/types';
import { mediaQueryEffect, networkStatusEffect } from '@states/Effects/atomEffects';
import { format, startOfToday } from 'date-fns';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { Descendant, Node } from 'slate';

/**
 * Editor
 */

export const atomEditorSerialize = atom({
  key: 'atomEditorSerialize',
  default: (nodes: Descendant[]) => {
    return nodes.map((n) => Node.string(n)).join('\n');
  },
});

export const atomEditorDeserialize = atom({
  key: 'atomEditorDeserialize',
  default: (string: string) => {
    if (typeof string !== 'undefined') {
      return string.split('\n').map((line) => {
        return {
          children: [{ text: line }],
        };
      });
    }
  },
});

/**
 * Catch States
 */
export const atomCatch = atomFamily<boolean, CATCH_MODAL>({
  key: 'atomCatch',
  default: false,
});

/**
 * Modals
 */

// Todo Modal
export const atomTodoModalOpen = atomFamily({
  key: 'atomTodoModalOpen',
  default: false,
});

export const atomTodoModalMini = atomFamily({
  key: 'atomTodoModalMini',
  default: false,
});

export const atomTodoModalMax = atomFamily({
  key: 'atomTodoModalMax',
  default: false,
});

// Confirm Modal
export const atomConfirmModalDiscard = atomFamily({
  key: 'atomConfirmModalDiscard',
  default: false,
});

export const atomConfirmModalDelete = atomFamily({
  key: 'atomConfirmModalDelete',
  default: false,
});

/**
 * Focus
 */
export const atomOnBlur = atom({
  key: 'atomOnBlur',
  default: false,
});

export const atomOnFocus = atom({
  key: 'atomOnFocus',
  default: false,
});

export const atomCurrentFocus = atom({
  key: 'atomCurrentFocus',
  default: -1,
});

/**
 * Notification
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

export const selectorNotificationState = selector<TypesNotification>({
  key: 'selectorNotificationState',
  get: ({ get }) => get(atomNotificationDataItem(get(atomNotificationID))),
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

/**
 * Media Queries
 */
export const atomMediaQuery = atomFamily<boolean, BREAKPOINT>({
  key: 'atomMediaQuery',
  default: false,
  effects: (breakpoint) => [mediaQueryEffect(breakpoint)],
});

/**
 * Network
 */
export const atomNetworkStatusEffect = atom({
  key: 'atomNetworkStatusEffect',
  default: true,
  effects: [networkStatusEffect],
});

/**
 * Select
 * Priority Levels
 */

export const atomPriority = atomFamily<PRIORITY_LEVEL | null, Todos['_id']>({
  key: 'atomPriority',
  default: null,
});

/**
 * Calender & DayPicker & MonthPicker
 */
export const atomDayPicker = atomFamily<Todos['dueDate'], Todos['_id']>({
  key: 'atomDayPicker',
  default: null,
});

export const atomDayPickerUpdater = atomFamily<Todos['dueDate'], Todos['_id']>({
  key: 'atomDayPickerUpdater',
  default: selectorFamily({
    key: 'selectorAtomDayPickerUpdater',
    get:
      (_id) =>
      ({ get }) => {
        return get(atomDayPicker(_id));
      },
    cachePolicy_UNSTABLE: {
      eviction: 'most-recent',
    },
  }),
});

export const atomCurrentMonth = atomFamily<string, Todos['_id']>({
  key: 'atomCurrentMonth',
  default: format(startOfToday(), 'MMM-yyyy'),
});

/**
 * Dropdown
 */
export const atomActiveMenuItemId = atom<string | null>({
  key: 'atomActiveMenuitemId',
  default: null,
});

export const atomActiveMenuItem = atomFamily<boolean, string | null>({
  key: 'atomActiveMenuItem',
  default: false,
  effects: (atomActiveMenuItemId) => [
    ({ setSelf }) => {
      atomActiveMenuItemId !== null && setSelf(true);
    },
  ],
});

export const selectorActiveMenuItem = selector({
  key: 'selectorActiveMenuItem',
  get: ({ get }) => {
    return get(atomActiveMenuItem(get(atomActiveMenuItemId)));
  },
});
