import { CALENDAR, NOTIFICATION } from '@data/stateObjects';
import { updateDataCalendarTodo } from '@lib/queries/queryTodos';
import { Todos } from '@lib/types';
import { useNotificationState } from '@states/notifications/hooks';
import { usePriorityRankScore } from '@states/priorities/hooks';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import { atomSelectorTodoItem, atomTodoNew } from '@states/todos/states';
import { useGetWithRecoilCallback } from '@states/utils/hooks';
import {
  parse,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  startOfToday,
  add,
  format,
  isPast,
  sub,
} from 'date-fns';
import equal from 'fast-deep-equal/react';
import { useRecoilCallback, RecoilValue } from 'recoil';
import { atomCurrentMonth, atomDayPickerUpdater, atomDayPicker } from './states';

/**
 * Hooks
 * */

export const useCalState = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ set, reset, snapshot }) => (state: CALENDAR) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const currentMonth = get(atomCurrentMonth(todoId));
    const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
    const days = eachDayOfInterval({
      start: startOfWeek(firstDayCurrentMonth),
      end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    });
    const day = days.find((day) => day) || ({} as Date);

    switch (state) {
      case CALENDAR['today']:
        set(atomDayPickerUpdater(todoId), startOfToday());
        reset(atomCurrentMonth(todoId));
        break;
      case CALENDAR['nextMonth']:
        const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        set(atomCurrentMonth(todoId), format(firstDayNextMonth, 'MMM-yyyy'));
        break;
      case CALENDAR['previousMonth']:
        if (isPast(day)) {
          reset(atomCurrentMonth(todoId));
          return;
        }
        const firstDayPreviousMonth = sub(firstDayCurrentMonth, {
          months: 1,
        });
        set(atomCurrentMonth(todoId), format(firstDayPreviousMonth, 'MMM-yyyy'));
        break;
      case CALENDAR['days']:
        return days;
    }
  });
};

export const useCalResetDateItemOnly = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ reset }) => () => {
    reset(atomCurrentMonth(todoId));
    reset(atomSelectorTodoItem(todoId));
    reset(atomDayPicker(todoId));
    reset(atomDayPickerUpdater(todoId));
    // set(atomDayPickerUpdater(todoId), null); //derived state does not reset to default value as null if reset
  });
};
export const useCalResetDateAll = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ reset, set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    reset(atomCurrentMonth(todoId));
    reset(atomDayPicker(todoId));
    set(atomDayPickerUpdater(todoId), null); //derived state does not reset to default value as null if reset

    typeof todoId === 'undefined'
      ? set(atomTodoNew, {
          ...get(atomTodoNew),
          dueDate: null,
        })
      : set(atomSelectorTodoItem(todoId), {
          ...get(atomSelectorTodoItem(todoId)),
          dueDate: null,
        });
  });
};

export const useCalSelectDay = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ set }) => (newValue: Date) => {
    set(atomDayPickerUpdater(todoId), newValue);
  });
};

export const useCalUpdateDay = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomDayPicker(todoId), get(atomDayPickerUpdater(todoId)));
  });
};

export const useCalUpdate = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (get(atomDayPickerUpdater(todoId)) == null) return;

    typeof todoId === 'undefined'
      ? set(atomTodoNew, {
          ...get(atomTodoNew),
          dueDate: get(atomDayPicker(undefined)),
        })
      : set(atomSelectorTodoItem(todoId), {
          ...get(atomSelectorTodoItem(todoId)),
          dueDate: get(atomDayPicker(todoId)),
        });
  });
};

export const useCalUpdateItem = (todoId: Todos['_id']) => {
  const updateCalendarDay = useCalUpdateDay(todoId);
  const updateCalendarTodoItem = useCalUpdate(todoId);

  return () => {
    updateCalendarDay();
    updateCalendarTodoItem();
  };
};

export const useCalUpdateDataItem = (todoId: Todos['_id']) => {
  const get = useGetWithRecoilCallback();
  const updateCalItem = useCalUpdateItem(todoId);
  const updatePriorityRankScore = usePriorityRankScore(todoId);
  const setNotification = useNotificationState();
  const updateCalQueryItem = useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    set(atomQueryTodoItem(todoId), get(atomSelectorTodoItem(todoId)));

    updateDataCalendarTodo(
      todoId,
      get(atomSelectorTodoItem(todoId)).dueDate as Date,
      get(atomSelectorTodoItem(todoId)).priorityRankScore,
    );
    reset(atomSelectorTodoItem(todoId));
  });

  return () => {
    updateCalItem();
    updatePriorityRankScore();
    if (equal(get(atomQueryTodoItem(todoId)).dueDate, get(atomSelectorTodoItem(todoId)).dueDate))
      return;
    get(atomSelectorTodoItem(todoId)).dueDate
      ? setNotification(NOTIFICATION['updatedDueDate'])
      : setNotification(NOTIFICATION['removedDueDate']);
    updateCalQueryItem();
  };
};

export const useCalResetDayUpdater = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ reset }) => () => {
    reset(atomDayPickerUpdater(todoId));
  });
};
