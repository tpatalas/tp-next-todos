import { atomQueryTodoIds } from '@states/atomQuries';
import { Fragment as TodosFragment } from 'react';
import { useRecoilValue } from 'recoil';
import { Todo } from './todo';

export const TodoList = () => {
  const todosIds = useRecoilValue(atomQueryTodoIds);
  const todoIdsReversed = [...todosIds].reverse();

  return (
    <TodosFragment>
      <ul>
        {todoIdsReversed.map((todo, index) => (
          <li key={todo._id?.toString()}>
            <Todo
              todo={todo}
              index={index}
            />
          </li>
        ))}
      </ul>
    </TodosFragment>
  );
};
