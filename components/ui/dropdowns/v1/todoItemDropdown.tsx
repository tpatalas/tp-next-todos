import { PriorityButton } from '@buttons/iconButton/priorityButton';
import {
  optionsDropdownCalendar,
  optionsPriorityDropdownImportant,
  optionsPriorityDropdownUrgent,
} from '@data/dataOptions';
import { MODIFIER_KBD, PRIORITY_LEVEL } from '@data/dataTypesConst';
import { ICON_DELETE, ICON_MORE_VERT } from '@data/materialSymbols';
import { TypesOptionsDropdown } from '@lib/types/typesOptions';
import { useCalUpdateDataItem } from '@states/calendars/hooks';
import { ActiveDropdownMenuItemEffect } from '@states/misc/activeDropdownMenuItemEffect';
import { usePriorityUpdate, usePriorityUpdateData } from '@states/priorities/hooks';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import { useTodoRemoveItem } from '@states/todos/hooks';
import { Types } from 'lib/types';
import { useRecoilValue } from 'recoil';
import { CalendarDropdown } from './calendarDropdown';
import { Dropdown } from './dropdown';
import { DropdownMenuItem } from './dropdown/dropdownMenuItem';

type Props = { options: TypesOptionsDropdown } & Partial<Pick<Types, 'todo' | 'children'>>;

export const TodoItemDropdown = ({ todo, children, options }: Props) => {
  const removeTodo = useTodoRemoveItem(todo?._id);
  const updateCalendarDataItem = useCalUpdateDataItem(todo?._id);
  const setPriority = typeof todo === 'undefined' ? usePriorityUpdate(undefined) : usePriorityUpdateData(todo?._id);
  const todoItem = useRecoilValue(atomQueryTodoItem(todo?._id));

  return (
    <Dropdown
      options={{
        tooltip: 'Menu',
        path: ICON_MORE_VERT,
        menuHeight: options.menuHeight ?? 'mt-2',
        isInitiallyVisible: options.isInitiallyVisible,
      }}>
      <ActiveDropdownMenuItemEffect menuItemId={null} />
      {/* give menuItemId any ID: string to activate the keyboard navigation */}
      {children}
      <div className='py-1'>
        <DropdownMenuItem options={{ padding: 'p-0', isDisabled: todoItem.completed && true }}>
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
        <DropdownMenuItem options={{ padding: 'p-0', isDisabled: todoItem.completed && true }}>
          <PriorityButton
            options={optionsPriorityDropdownUrgent}
            todo={todo}
            onClick={() => setPriority(PRIORITY_LEVEL['urgent'])}
          />
        </DropdownMenuItem>
        <DropdownMenuItem options={{ padding: 'p-0', isDisabled: todoItem.completed && true }}>
          <PriorityButton
            todo={todo}
            options={optionsPriorityDropdownImportant}
            onClick={() => setPriority(PRIORITY_LEVEL['important'])}
          />
        </DropdownMenuItem>
      </div>
      <div className='py-1'>
        <DropdownMenuItem
          options={{
            shouldKeepOpeningOnClick: false,
            tooltip: 'Delete',
            path: ICON_DELETE,
            kbd: MODIFIER_KBD['modifier + Delete'],
          }}
          onClick={() => removeTodo()}>
          Delete
        </DropdownMenuItem>
      </div>
    </Dropdown>
  );
};
