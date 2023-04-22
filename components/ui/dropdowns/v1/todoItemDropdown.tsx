import { PriorityButton } from '@buttons/iconButton/priorityButton';
import { ICON_DELETE, ICON_MORE_VERT } from '@data/materialSymbols';
import { Types } from 'lib/types';
import { useRecoilValue } from 'recoil';
import { CalendarDropdown } from './calendarDropdown';
import { Dropdown } from './dropdown';
import { DropdownMenuItem } from './dropdown/dropdownMenuItem';
import { PRIORITY_LEVEL, MODIFIER_KBD } from '@constAssertions/misc';
import { optionsPriorityDropdownUrgent, optionsPriorityDropdownImportant } from '@options/dropdown';
import { optionsDropdownCalendar } from '@options/misc';
import { ActiveDropdownMenuItemEffect } from '@effects/activeDropdownMenuItemEffect';
import { useCalUpdateDataItem } from '@hooks/calendar';
import { usePriorityUpdate, usePriorityUpdateData } from '@hooks/priorities';
import { useTodoRemoveItem } from '@hooks/todos';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import { TypesOptionsDropdown } from '@lib/types/options';

type Props = { options: TypesOptionsDropdown } & Partial<Pick<Types, 'todo' | 'children'>>;

export const TodoItemDropdown = ({ todo, children, options }: Props) => {
  const removeTodo = useTodoRemoveItem(todo?._id);
  const updateCalendarDataItem = useCalUpdateDataItem(todo?._id);
  const priority = usePriorityUpdate(undefined);
  const priorityData = usePriorityUpdateData(todo?._id);
  const setPriority = typeof todo === 'undefined' ? priority : priorityData;
  const todoItem = useRecoilValue(selectorSessionTodoItem(todo?._id));

  return (
    <Dropdown
      options={{
        tooltip: 'Menu',
        path: ICON_MORE_VERT,
        menuHeight: options.menuHeight ?? 'mt-2',
        isInitiallyVisible: options.isInitiallyVisible,
      }}
    >
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
          onClick={() => removeTodo()}
        >
          Delete
        </DropdownMenuItem>
      </div>
    </Dropdown>
  );
};
