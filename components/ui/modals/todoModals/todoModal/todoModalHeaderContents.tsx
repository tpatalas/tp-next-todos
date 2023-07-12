import { PriorityButton } from '@buttons/iconButton/priorityButton';
import { TypesTodo } from '@components/todos/todos.types';
import { PRIORITY_LEVEL } from '@constAssertions/misc';
import { usePriorityUpdate } from '@hooks/priorities';
import { Types } from '@lib/types';
import { HeaderDescription } from '@modals/modal/modalHeaders/headerDescription';
import { optionsPriorityTodoModalImportant, optionsPriorityTodoModalUrgent } from '@options/dropdown';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import { useRecoilCallback } from 'recoil';

type Props = Pick<Types, 'children'> & Partial<Pick<TypesTodo, 'todo'>>;

export const TodoModalHeaderContents = ({ todo, children }: Props) => {
  const setPriority = usePriorityUpdate(todo?._id);
  const isTodoCompleted = useRecoilCallback(({ snapshot }) => () => {
    return (
      typeof todo !== 'undefined' &&
      snapshot.getLoadable(selectorSessionTodoItem(todo._id)).getValue().completed
    );
  });
  const disabledStyle = isTodoCompleted() ? 'cursor-not-allowed opacity-50 select-none' : '';
  const conditionalHeaderDescription = isTodoCompleted() ? 'Completed todo' : 'Update todo';

  return (
    <div className='sm:flex sm:items-center'>
      <div className='flex flex-row items-center text-center sm:ml-3 sm:mt-0 sm:pt-0 sm:text-left'>
        {children}
        <PriorityButton
          todo={todo}
          options={{ container: disabledStyle, ...optionsPriorityTodoModalImportant }}
          onClick={() => setPriority(PRIORITY_LEVEL['important'])}
        />
        <PriorityButton
          todo={todo}
          options={{ container: disabledStyle, ...optionsPriorityTodoModalUrgent }}
          onClick={() => setPriority(PRIORITY_LEVEL['urgent'])}
        />
        <HeaderDescription>
          <span className='font-semibold'>
            {typeof todo === 'undefined' ? 'Create todo' : conditionalHeaderDescription}
          </span>
        </HeaderDescription>
      </div>
    </div>
  );
};
