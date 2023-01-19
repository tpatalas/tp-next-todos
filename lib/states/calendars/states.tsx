import { Todos } from "@lib/types";
import { format, startOfToday } from "date-fns";
import { atomFamily, selectorFamily } from "recoil";

/**
 * atoms
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


