import { Button } from '@buttons/button';
import { IconButton } from '@buttons/iconButton';
import {
  dataButtonCalendarCancel,
  dataButtonCalendarConfirm,
  dataButtonCalendarResetDate,
} from '@data/dataObjects';
import { ICON_EVENT_AVAILABLE, ICON_EVENT_AVAILABLE_FILL } from '@data/materialSymbols';
import { Menu } from '@headlessui/react';
import { TypesDataDropdown } from '@lib/types/typesData';
import {
  useCalResetDateAll,
  useCalResetDateItemOnly,
  useCalResetDayUpdater,
} from '@states/calendars/hooks';
import { atomSelectorTodoItem, atomTodoNew } from '@states/todos';
import { classNames } from '@states/utils';
import { Calendar } from '@ui/calendars/calendar';
import { format } from 'date-fns';
import { Types } from 'lib/types';
import { Fragment as HeaderContentsFragment } from 'react';
import { useRecoilValue } from 'recoil';
import { Dropdown } from './dropdown';

type Props = { data: TypesDataDropdown } & Partial<Pick<Types, 'todo'>> &
  Pick<Types, 'onClickConfirm'>;

export const CalendarDropdown = ({
  todo,
  onClickConfirm,
  data: { borderRadius, tooltip, hoverBg, padding = 'px-3 py-2' },
}: Props) => {
  const resetCalendar = useCalResetDayUpdater(todo?._id);
  const resetDateItemOnly = useCalResetDateItemOnly(todo?._id);
  const resetDateAll = useCalResetDateAll(todo?._id);
  const todoItem =
    typeof todo === 'undefined'
      ? useRecoilValue(atomTodoNew)
      : useRecoilValue(atomSelectorTodoItem(todo._id));
  const noDaySelected = todoItem.dueDate == null;

  return (
    <Dropdown
      data={{
        tooltip: tooltip,
        padding: padding,
        borderRadius: borderRadius,
        color: noDaySelected
          ? 'fill-gray-500 [.group-calendarDropdown:hover_&]:fill-gray-700'
          : 'fill-blue-500 [.group-calendarDropdown:hover_&]:fill-blue-700',
        path: noDaySelected ? ICON_EVENT_AVAILABLE : ICON_EVENT_AVAILABLE_FILL,
        group: 'group-calendarDropdown',
        contentWidth: 'w-[21rem]',
        menuWidth: 'w-full',
        hoverBg: hoverBg,
        text: classNames('[.group-calendarDropdown:hover_&]:text-gray-700'),
      }}
      headerContents={
        <HeaderContentsFragment>
          {noDaySelected ? 'Due date' : format(new Date(todoItem.dueDate as Date), 'MMM dd, yy')}
        </HeaderContentsFragment>
      }>
      <div className='p-2'>
        <Calendar todo={todo} />
        <div className='flex flex-row items-center justify-between px-4 pb-4 pt-5'>
          <IconButton
            data={dataButtonCalendarResetDate}
            onClick={() => resetDateAll()}
          />
          <div className='flex flex-row justify-end'>
            <Menu.Item>
              <Button
                data={dataButtonCalendarCancel}
                onClick={() => {
                  resetCalendar();
                  resetDateItemOnly();
                }}>
                Cancel
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                data={dataButtonCalendarConfirm}
                onClick={onClickConfirm}>
                Ok
              </Button>
            </Menu.Item>
          </div>
        </div>
      </div>
    </Dropdown>
  );
};
