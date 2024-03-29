import { Button } from '@buttons/button';
import { IconButton } from '@buttons/iconButton';
import { TypesTodo } from '@components/todos/todos.types';
import { CALENDAR } from '@constAssertions/misc';
import { ICON_TODAY } from '@data/materialSymbols';
import { STYLE_CALENDAR_COL_START } from '@data/stylePreset';
import { useCalState, useCalUpdateItem, useCalSelectDay } from '@hooks/calendar';
import { Types } from '@lib/types';
import { optionsButtonCalendarPrevMonth, optionsButtonCalendarNextMonth } from '@options/button';
import { classNames } from '@stateLogics/utils';
import { atomSelectorTodoItem } from '@states/atomEffects/todos';
import { atomDayPickerUpdater, atomCurrentMonth } from '@states/calendars';
import { format, getDay, isEqual, isPast, isSameMonth, isThisMonth, isToday, parse } from 'date-fns';
import { useRecoilValue } from 'recoil';

type Props = Partial<Pick<Types, 'headerButtons'> & Pick<TypesTodo, 'todo'>>;

export const Calendar = ({ todo, headerButtons }: Props) => {
  const itemDay = useRecoilValue(atomDayPickerUpdater(todo?._id)) as Date;
  const dueDate = new Date(useRecoilValue(atomSelectorTodoItem(todo?._id)).dueDate as Date);
  const queryDay = typeof todo !== 'undefined' && dueDate;
  const selectedDay = queryDay || itemDay;
  const currentMonth = useRecoilValue(atomCurrentMonth(todo?._id));
  const setCalendar = useCalState(todo?._id);
  const firstDayCurrentMonth = parse(currentMonth!, 'MMM-yyyy', new Date());
  const days = setCalendar(CALENDAR['days']);
  const updateCalendarItem = useCalUpdateItem(todo?._id);
  const selectDay = useCalSelectDay(todo?._id);

  return (
    <div className='w-full p-1 font-sans'>
      <div className='mt-2 flex flex-row items-center justify-between pl-3'>
        <h2 className='text-sm font-semibold text-gray-900'>{format(firstDayCurrentMonth, 'MMMM yyyy')}</h2>
        <div className='flex flex-row items-center justify-center space-x-1'>
          <IconButton
            options={optionsButtonCalendarPrevMonth}
            onClick={() => setCalendar(CALENDAR['previousMonth'])}
          >
            <span className='sr-only'>Previous month</span>
          </IconButton>
          <IconButton
            options={{
              path: ICON_TODAY,
              tooltip: 'Today',
              isDisabled: isToday(selectedDay) && isThisMonth(new Date(currentMonth)) ? true : false,
            }}
            onClick={() => {
              setCalendar(CALENDAR['today']);
              updateCalendarItem();
            }}
          />
          <IconButton
            options={optionsButtonCalendarNextMonth}
            onClick={() => setCalendar(CALENDAR['nextMonth'])}
          >
            <span className='sr-only'>Next month</span>
          </IconButton>
        </div>
      </div>
      {headerButtons}
      <div className='mt-7 grid grid-cols-7 text-center text-xs leading-6 text-gray-500'>
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className='mt-2 grid grid-cols-7 text-sm'>
        {days!.map((day, dayIdx) => (
          <div
            key={day.toString()}
            className={classNames(dayIdx === 0 && STYLE_CALENDAR_COL_START[getDay(day)], 'py-1')}
          >
            <Button
              onClick={() => {
                if (isPast(day) && !isToday(day)) return;
                selectDay(day);
                updateCalendarItem();
              }}
              options={{
                className: classNames(
                  isEqual(day, selectedDay) && 'text-white',
                  !isEqual(day, selectedDay) && isToday(day) && 'text-blue-600',
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isPast(day) &&
                    'cursor-default !text-gray-300 hover:bg-transparent',
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    'text-gray-700',
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    'text-gray-300',
                  isEqual(day, selectedDay) && isToday(day) && '!bg-blue-600',
                  isEqual(day, selectedDay) && !isToday(day) && '!bg-blue-600',
                  !isEqual(day, selectedDay) && !isPast(day) && 'hover:bg-gray-100',
                  isToday(day) && 'hover:bg-gray-100',
                  (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                  'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                ),
              }}
            >
              <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
