import { PriorityButton } from '@buttons/iconButton/priorityButton';
import { dataPriorityTodoModalImportant, dataPriorityTodoModalUrgent } from '@data/dataObjects';
import { PRIORITY_LEVEL } from '@data/dataTypesObjects';
import { Types } from '@lib/types';
import { HeaderDescription } from '@modals/modal/modalHeaders/headerDescription';
import { usePriorityUpdate } from '@states/priorities/hooks';

type Props = Pick<Types, 'children'> & Partial<Pick<Types, 'todo'>>;

export const TodoModalHeaderContents = ({ todo, children }: Props) => {
  const setPriority = usePriorityUpdate(todo?._id);

  return (
    <div className='sm:flex sm:items-center'>
      <div className='flex flex-row items-center text-center sm:ml-3 sm:mt-0 sm:pt-0 sm:text-left'>
        {children}
        <PriorityButton
          todo={todo}
          data={dataPriorityTodoModalImportant}
          onClick={() => setPriority(PRIORITY_LEVEL['important'])}
        />
        <PriorityButton
          todo={todo}
          data={dataPriorityTodoModalUrgent}
          onClick={() => setPriority(PRIORITY_LEVEL['urgent'])}
        />
        <HeaderDescription>
          <span className='font-semibold'>
            {typeof todo === 'undefined' ? 'Create todo' : 'Update todo'}
          </span>
        </HeaderDescription>
      </div>
    </div>
  );
};
