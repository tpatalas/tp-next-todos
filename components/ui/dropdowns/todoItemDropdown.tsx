import { PriorityButton } from '@buttons/iconButton/priorityButton';
import {
  dataDropdownCalendar,
  dataPriorityDropdownImportant,
  dataPriorityDropdownUrgent,
} from '@data/dataObjects';
import { ICON_DELETE, ICON_MORE_VERT } from '@data/materialSymbols';
import { PRIORITY_LEVEL } from '@data/stateObjects';
import { TypesDataDropdown } from '@lib/types/typesData';
import { useCalUpdateDataItem } from '@states/calendars/hooks';
import { ActiveDropdownMenuItemEffect } from '@states/misc/activeDropdownMenuItemEffect';
import { usePriorityUpdate, usePriorityUpdateData } from '@states/priorities/hooks';
import { useTodoStateRemove } from '@states/todos/hooks';
import { Types } from 'lib/types';
import { CalendarDropdown } from './calendarDropdown';
import { Dropdown } from './dropdown';
import { DropdownMenuItem } from './dropdown/dropdownMenuItem';

type Props = { data: TypesDataDropdown } & Partial<Pick<Types, 'todo' | 'children'>>;

export const TodoItemDropdown = ({ todo, children, data: { isInitiallyVisible } }: Props) => {
  const removeTodo = useTodoStateRemove(todo?._id);
  const updateCalendarDataItem = useCalUpdateDataItem(todo?._id);
  const setPriority =
    typeof todo === 'undefined' ? usePriorityUpdate(undefined) : usePriorityUpdateData(todo?._id);

  return (
    <Dropdown
      data={{
        tooltip: 'Menu',
        path: ICON_MORE_VERT,
        isInitiallyVisible: isInitiallyVisible,
      }}>
      <ActiveDropdownMenuItemEffect menuItemId={null} />
      {/* give menuItemId any ID: string to activate the keyboard navigation */}
      {children}
      <div className='py-1'>
        <DropdownMenuItem
          isDisabledCloseOnClick={true}
          padding='p-0'>
          <div className='w-full'>
            <CalendarDropdown
              data={dataDropdownCalendar}
              todo={todo}
              onClickConfirm={() => updateCalendarDataItem()}
            />
          </div>
        </DropdownMenuItem>
      </div>
      <div className='py-1'>
        <DropdownMenuItem
          isDisabledCloseOnClick={true}
          padding='p-0'>
          <PriorityButton
            data={dataPriorityDropdownUrgent}
            todo={todo}
            onClick={() => setPriority(PRIORITY_LEVEL['urgent'])}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          isDisabledCloseOnClick={true}
          padding='p-0'>
          <PriorityButton
            todo={todo}
            data={dataPriorityDropdownImportant}
            onClick={() => setPriority(PRIORITY_LEVEL['important'])}
          />
        </DropdownMenuItem>
      </div>
      <div className='py-1'>
        <DropdownMenuItem
          onClick={() => removeTodo()}
          path={ICON_DELETE}
          tooltip='Delete'
          kbd='⌘ + Delete'>
          Delete
        </DropdownMenuItem>
      </div>
    </Dropdown>
  );
};
