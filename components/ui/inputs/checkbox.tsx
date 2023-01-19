import { classNames } from '@states/utils';
import { useConditionCompareTodoItemsEqual } from '@states/utils/hooks';
import { Types, TypesTodo } from 'lib/types';
import { Input } from './input';

type Props = Partial<
  Pick<Types, 'checked' | 'onChange' | 'className' | 'checkBoxColor' | 'checkedColor'>
> &
  Pick<TypesTodo, 'todoItem'>;

export const CheckBox = ({
  todoItem,
  checked,
  checkBoxColor = 'border-gray-300',
  checkedColor = 'text-red-600',
  onChange,
}: Props) => {
  const conditionalDisable = useConditionCompareTodoItemsEqual(todoItem._id);
  return (
    <Input
      name='checkbox'
      type='checkbox'
      className={classNames(
        'h-5 w-5 cursor-pointer rounded-md hover:ring-4 hover:ring-gray-200 hover:ring-offset-2 focus:ring-4 focus:ring-gray-200 focus:ring-offset-2',
        !conditionalDisable && !todoItem.completed ? 'cursor-not-allowed bg-gray-100' : '',
        checkBoxColor,
        checkedColor,
      )}
      tooltip={!todoItem.completed ? 'Complete' : 'Undo Complete'}
      kbd='⌘ + Enter'
      checked={checked}
      onChange={onChange}
      disabled={!conditionalDisable && !todoItem.completed}
    />
  );
};
