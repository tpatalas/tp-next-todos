import { IconButton } from '@buttons/iconButton';
import { PRIORITY_LEVEL } from '@data/dataTypesObjects';
import {
  ICON_FLAG,
  ICON_FLAG_FILL,
  ICON_LABEL_IMPORTANT,
  ICON_LABEL_IMPORTANT_FILL,
} from '@data/materialSymbols';
import { Types } from '@lib/types';
import { TypesDataPriority } from '@lib/types/typesData';
import { atomTodoNew, atomSelectorTodoItem } from '@states/todos';
import { classNames } from '@states/utils';
import { Fragment as TodoPriorityFragment } from 'react';
import { useRecoilValue } from 'recoil';

type Props = { data: TypesDataPriority } & Partial<Pick<Types, 'todo'>> & Pick<Types, 'onClick'>;

export const PriorityButton = ({ todo, data, onClick }: Props) => {
  const todoItem =
    typeof todo === 'undefined'
      ? useRecoilValue(atomTodoNew)
      : useRecoilValue(atomSelectorTodoItem(todo._id));
  const priorityImportant = todoItem.priorityLevel === PRIORITY_LEVEL['important'];
  const priorityUrgent = todoItem.priorityLevel === PRIORITY_LEVEL['urgent'];
  const levelImportant = data.priorityLevel === PRIORITY_LEVEL['important'];
  const levelUrgent = data.priorityLevel === PRIORITY_LEVEL['urgent'];

  return (
    <TodoPriorityFragment>
      <IconButton
        data={{
          path: classNames(
            levelImportant && !priorityImportant && ICON_LABEL_IMPORTANT,
            levelImportant && priorityImportant && ICON_LABEL_IMPORTANT_FILL,
            levelUrgent && !priorityUrgent && ICON_FLAG,
            levelUrgent && priorityUrgent && ICON_FLAG_FILL,
          ),
          tooltip: classNames(
            levelImportant && !priorityImportant && 'Not important',
            levelImportant && priorityImportant && 'Important',
            levelUrgent && !priorityUrgent && 'Not urgent',
            levelUrgent && priorityUrgent && 'Urgent',
          ),
          color: classNames(
            !priorityImportant &&
              !priorityUrgent &&
              'fill-gray-500 [.group-button:hover_&]:fill-gray-700',
            levelImportant &&
              priorityImportant &&
              'fill-yellow-500 [.group-button:hover_&]:fill-yellow-600',
            levelUrgent && priorityUrgent && 'fill-red-600 [.group-button:hover_&]:fill-red-700',
          ),
          borderRadius: 'rounded-none focus-visible:rounded-lg',
          margin: 'ml-0',
          hoverBg: 'hover:bg-transparent',
          display: data.display,
          width: data.width,
          container: data.container,
          padding: data.padding,
        }}
        headerContents={
          data.isInitiallyVisible &&
          classNames(
            levelImportant && !priorityImportant && data.priorityNormal,
            levelImportant && priorityImportant && data.priorityImportant,
            levelUrgent && !priorityUrgent && data.priorityNormal,
            levelUrgent && priorityUrgent && data.priorityUrgent,
          )
        }
        onClick={onClick}
      />
    </TodoPriorityFragment>
  );
};
