import { TypesTodos } from '@components/todos/todos.types';
import { format, startOfToday } from 'date-fns';
import { atomFamily, selectorFamily } from 'recoil';

/**
 * atoms
 */
export const atomDayPicker = atomFamily<TypesTodos['dueDate'], TypesTodos['_id']>({
  key: 'atomDayPicker',
  default: null,
});

export const atomDayPickerUpdater = atomFamily<TypesTodos['dueDate'], TypesTodos['_id']>({
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

export const atomCurrentMonth = atomFamily<string, TypesTodos['_id']>({
  key: 'atomCurrentMonth',
  default: format(startOfToday(), 'MMM-yyyy'),
});
