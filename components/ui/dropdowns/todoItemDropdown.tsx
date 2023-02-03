import { PriorityButton } from '@buttons/iconButton/priorityButton';
import {
  optionsDropdownCalendar,
  optionsPriorityDropdownUrgent,
  optionsPriorityDropdownImportant,
} from '@data/dataOptions';
import { PRIORITY_LEVEL } from '@data/dataTypesObjects';
import { ICON_DELETE, ICON_MORE_VERT } from '@data/materialSymbols';
import { TypesOptionsDropdown } from '@lib/types/typesOptions';
import { useCalUpdateDataItem } from '@states/calendars/hooks';
import { ActiveDropdownMenuItemEffect } from '@states/misc/activeDropdownMenuItemEffect';
import { usePriorityUpdate, usePriorityUpdateData } from '@states/priorities/hooks';
import { useTodoRemoveItem } from '@states/todos/hooks';
import { Types } from 'lib/types';
import { CalendarDropdown } from './calendarDropdown';
import { Dropdown } from './dropdown';
import { DropdownMenuItem } from './dropdown/dropdownMenuItem';

type Props = { options: TypesOptionsDropdown } & Partial<Pick<Types, 'todo' | 'children'>>;

export const TodoItemDropdown = ({ todo, children, options }: Props) => {
  const removeTodo = useTodoRemoveItem(todo?._id);
  const updateCalendarDataItem = useCalUpdateDataItem(todo?._id);
  const setPriority = typeof todo === 'undefined' ? usePriorityUpdate(undefined) : usePriorityUpdateData(todo?._id);

  return (
    <Dropdown
      options={{
        tooltip: 'Menu',
        path: ICON_MORE_VERT,
        isInitiallyVisible: options.isInitiallyVisible,
      }}>
      <ActiveDropdownMenuItemEffect menuItemId={null} />
      {/* give menuItemId any ID: string to activate the keyboard navigation */}
      {children}
      <div className='py-1'>
        <DropdownMenuItem padding='p-0'>
          <div className='w-full'>
            <CalendarDropdown
              options={optionsDropdownCalendar}
              todo={todo}
              onClickConfirm={() => updateCalendarDataItem()}
            />
          </div>
        </DropdownMenuItem>
      </div>
      <div className='py-1'>
        <DropdownMenuItem padding='p-0'>
          <PriorityButton
            options={optionsPriorityDropdownUrgent}
            todo={todo}
            onClick={() => setPriority(PRIORITY_LEVEL['urgent'])}
          />
        </DropdownMenuItem>
        <DropdownMenuItem padding='p-0'>
          <PriorityButton
            todo={todo}
            options={optionsPriorityDropdownImportant}
            onClick={() => setPriority(PRIORITY_LEVEL['important'])}
          />
        </DropdownMenuItem>
      </div>
      <div className='py-1'>
        <DropdownMenuItem
          isDisabledCloseOnClick={false}
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
