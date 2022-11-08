import { PriorityButton } from '@buttons/iconButton/priorityButton';
import { dataPriorityTodoModalImportant, dataPriorityTodoModalUrgent } from '@data/dataObjects';
import { PRIORITY_LEVEL } from '@data/stateObjects';
import { usePriorityUpdate } from '@hooks/usePriority';
import { Types } from '@lib/types';
import { HeaderDescription } from '@modals/modal/modalHeaders/headerDescription';
import { Div as Header, Div as HeaderContents } from '@containers/div';

type Props = Pick<Types, 'children'> & Partial<Pick<Types, 'todo'>>;

export const TodoModalHeaderContents = ({ todo, children }: Props) => {
  const setPriority = usePriorityUpdate(todo?._id);

  return (
    <Header className='sm:flex sm:items-center'>
      <HeaderContents className='flex flex-row items-center text-center sm:ml-3 sm:mt-0 sm:pt-0 sm:text-left'>
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
          <span className='font-semibold'>{typeof todo === 'undefined' ? 'Create todo' : 'Update todo'}</span>
        </HeaderDescription>
      </HeaderContents>
    </Header>
  );
};
