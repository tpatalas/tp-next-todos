import { Button } from '@buttons/button';
import { IconButton } from '@buttons/iconButton';
import { SvgIcon } from '@components/icons/svgIcon';
import { ICON_EVENT_AVAILABLE, ICON_EVENT_AVAILABLE_FILL } from '@data/materialSymbols';
import { Menu } from '@headlessui/react';
import { atomTodoNew } from '@states/todos';
import { format } from 'date-fns';
import { Types } from 'lib/types';
import { Fragment, Fragment as HeaderContentsFragment } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { Dropdown } from './dropdown';
import {
  optionsButtonCalendarResetDate,
  optionsButtonCalendarCancel,
  optionsButtonCalendarConfirm,
} from '@options/button';
import { useCalResetDayUpdater, useCalResetDateItemOnly, useCalResetDateAll } from '@hooks/calendar';
import { atomSelectorTodoItem, selectorSessionTodoItem } from '@states/atomEffects/todos';
import { Calendar } from '@ui/calendars/calendar';
import { classNames } from '@stateLogics/utils';
import { TypesOptionsDropdown } from '@lib/types/options';

type Props = { options: TypesOptionsDropdown } & Partial<Pick<Types, 'todo'>> & Pick<Types, 'onClickConfirm'>;

export const CalendarDropdown = ({ todo, onClickConfirm, options }: Props) => {
  const resetCalendar = useCalResetDayUpdater(todo?._id);
  const resetDateItemOnly = useCalResetDateItemOnly(todo?._id);
  const resetDateAll = useCalResetDateAll(todo?._id);
  const todoNew = useRecoilValue(atomTodoNew);
  const todoItemSelector = useRecoilValue(atomSelectorTodoItem(todo?._id));
  const todoItem = typeof todo === 'undefined' ? todoNew : todoItemSelector;
  const noDaySelected = todoItem.dueDate == null;
  const renderDueDate = noDaySelected ? 'Due date' : format(new Date(todoItem.dueDate as Date), 'MMM dd, yy');
  const isTodoCompleted = useRecoilCallback(({ snapshot }) => () => {
    return (
      typeof todo !== 'undefined' &&
      snapshot.getLoadable(selectorSessionTodoItem(todo?._id)).getValue().completed
    );
  });

  return (
    <Fragment>
      {isTodoCompleted() ? (
        <div
          className={classNames(
            'flex flex-row text-sm font-normal text-gray-500',
            options.padding ?? 'px-2 py-2 sm:px-3',
            options.borderRadius,
            options.container,
          )}
        >
          <SvgIcon
            options={{
              path: noDaySelected ? ICON_EVENT_AVAILABLE : ICON_EVENT_AVAILABLE_FILL,
              className: classNames(
                'h-5 w-5',
                noDaySelected
                  ? 'fill-gray-500 [.group-calendarDropdown:hover_&]:fill-gray-700'
                  : 'fill-blue-500 [.group-calendarDropdown:hover_&]:fill-blue-700',
              ),
            }}
          />
          <div className='px-3'> {renderDueDate}</div>
        </div>
      ) : (
        <div className={classNames(options.container)}>
          <Dropdown
            options={{
              tooltip: options.tooltip,
              padding: options.padding ?? 'px-2 sm:px-3 py-2',
              borderRadius: options.borderRadius,
              color: noDaySelected
                ? 'fill-gray-500 [.group-calendarDropdown:hover_&]:fill-gray-700'
                : 'fill-blue-500 [.group-calendarDropdown:hover_&]:fill-blue-700',
              path: noDaySelected ? ICON_EVENT_AVAILABLE : ICON_EVENT_AVAILABLE_FILL,
              group: 'group-calendarDropdown',
              menuItemsWidth: 'w-[21rem]',
              menuWidth: 'sm:w-full',
              hoverBg: options.hoverBg,
              text: classNames('[.group-calendarDropdown:hover_&]:text-gray-700'),
              isPortal: false,
            }}
            menuButtonContent={<HeaderContentsFragment>{renderDueDate}</HeaderContentsFragment>}
          >
            <div className='p-2'>
              <Calendar todo={todo} />
              <div className='flex flex-row items-center justify-between px-4 pb-4 pt-5'>
                <IconButton
                  options={optionsButtonCalendarResetDate}
                  onClick={() => resetDateAll()}
                />
                <div className='flex flex-row justify-end'>
                  <Menu.Item>
                    <Button
                      options={optionsButtonCalendarCancel}
                      onClick={() => {
                        resetCalendar();
                        resetDateItemOnly();
                      }}
                    >
                      Cancel
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      options={optionsButtonCalendarConfirm}
                      onClick={onClickConfirm}
                    >
                      Ok
                    </Button>
                  </Menu.Item>
                </div>
              </div>
            </div>
          </Dropdown>
        </div>
      )}
    </Fragment>
  );
};
