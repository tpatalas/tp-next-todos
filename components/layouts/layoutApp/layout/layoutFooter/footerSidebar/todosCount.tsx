import { Types } from '@lib/types';
import { selectorTodosCount } from '@states/todos';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

type Props = Partial<Pick<Types, 'label' | 'pathname'>>;

export const TodosCount = ({ pathname, label }: Props) => {
  const todosCount = useRecoilValue(
    selectorTodosCount({ pathname: pathname, labelId: label?._id }),
  );

  return <Fragment>{todosCount > 0 ? todosCount : undefined}</Fragment>;
};
