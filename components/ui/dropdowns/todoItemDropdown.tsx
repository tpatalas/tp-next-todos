import { PriorityButton } from '@buttons/iconButton/priorityButton';
import { Div as DivCalendar, Div as DivDivide } from '@containers/div';
import {
  dataDropdownCalendar,
  dataPriorityDropdownImportant,
  dataPriorityDropdownUrgent,
} from '@data/dataObjects';
import { ICON_DELETE, ICON_MORE_VERT } from '@data/materialSymbols';
import { PRIORITY_LEVEL } from '@data/stateObjects';
import { useCalUpdateDataItem } from '@hooks/useCalendar';
import { usePriorityUpdate, usePriorityUpdateData } from '@hooks/usePriority';
import { TypesDataDropdown } from '@lib/types/typesData';
import { ActiveDropdownMenuItemEffect } from '@states/Effects/activeDropdownMenuItemEffect';
import { useTodoStateRemove } from 'lib/states/hooks/useTodos';
import { Types } from 'lib/types';
import { CalendarDropdown } from './calendarDropdown';
import { Dropdown } from './dropdown';
import { DropdownMenuItem } from './dropdown/dropdownMenuItem';

type Props = { data: TypesDataDropdown } & Partial<Pick<Types, 'todo' | 'children'>>;

export const TodoItemDropdown = ({ todo, children, data: { initialVisible } }: Props) => {
  const removeTodo = useTodoStateRemove(todo?._id);
  const updateCalendarDataItem = useCalUpdateDataItem(todo?._id);
  const setPriority =
    typeof todo === 'undefined' ? usePriorityUpdate(undefined) : usePriorityUpdateData(todo?._id);

  return (
    <Dropdown
      data={{
        tooltip: 'Menu',
        path: ICON_MORE_VERT,
        initialVisible: initialVisible,
      }}>
      <ActiveDropdownMenuItemEffect menuItemId={null} />
      {/* give menuItemId any ID: string to activate the keyboard navigation */}
      {children}
      <DivDivide className='py-1'>
        <DropdownMenuItem
          disableCloseOnClick={true}
          padding='p-0'>
          <DivCalendar className='w-full'>
            <CalendarDropdown
              data={dataDropdownCalendar}
              todo={todo}
              onClickConfirm={() => updateCalendarDataItem()}
            />
          </DivCalendar>
        </DropdownMenuItem>
      </DivDivide>
      <DivDivide className='py-1'>
        <DropdownMenuItem
          disableCloseOnClick={true}
          padding='p-0'>
          <PriorityButton
            data={dataPriorityDropdownUrgent}
            todo={todo}
            onClick={() => setPriority(PRIORITY_LEVEL['urgent'])}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          disableCloseOnClick={true}
          padding='p-0'>
          <PriorityButton
            todo={todo}
            data={dataPriorityDropdownImportant}
            onClick={() => setPriority(PRIORITY_LEVEL['important'])}
          />
        </DropdownMenuItem>
      </DivDivide>
      <DivDivide className='py-1'>
        <DropdownMenuItem
          onClick={() => removeTodo()}
          path={ICON_DELETE}
          tooltip='Delete'
          kbd='⌘ + Delete'>
          Delete
        </DropdownMenuItem>
      </DivDivide>
    </Dropdown>
  );
};
