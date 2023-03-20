import { MODIFIER_KBD } from '@data/dataTypesConst';
import { classNames } from '@states/utils';
import { useConditionCompareTodoItemsEqual } from '@states/utils/hooks';
import { Types, TypesTodo } from 'lib/types';
import { Input } from './input';

type Props = Partial<Pick<Types, 'isChecked' | 'onChange' | 'className' | 'checkBoxColor' | 'checkedColor'>> &
  Pick<TypesTodo, 'todoItem'>;

export const CheckBox = ({
  todoItem,
  isChecked,
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
        'h-5 w-5 cursor-pointer rounded-md bg-transparent hover:ring-4 hover:ring-gray-200 hover:ring-offset-2 focus:ring-4 focus:ring-gray-200 focus:ring-offset-2',
        !conditionalDisable && !todoItem.completed ? 'cursor-not-allowed bg-gray-100' : '',
        checkBoxColor,
        checkedColor,
      )}
      tooltip={!todoItem.completed ? 'Complete' : 'Undo Complete'}
      kbd={MODIFIER_KBD['modifier + Enter']}
      isChecked={isChecked}
      onChange={onChange}
      isDisabled={!conditionalDisable && !todoItem.completed}
    />
  );
};
