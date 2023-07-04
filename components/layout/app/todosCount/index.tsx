import { PropsTodosCount } from '@layout/layout.types';
import { selectorTodosCount } from '@states/todos';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

export const TodosCount = ({ pathname, label }: PropsTodosCount) => {
  const todosCount = useRecoilValue(selectorTodosCount({ pathname: pathname, labelId: label?._id }));

  return <Fragment>{todosCount > 0 ? todosCount : undefined}</Fragment>;
};
