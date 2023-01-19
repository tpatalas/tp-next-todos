import { PATHNAME } from '@data/stateObjects';
import { selectorFilterTodoIdsByPathname } from '@states/todos';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

export const TodosCount = ({ pathname }: { pathname: PATHNAME }) => {
  const todoIdsByPathName = useRecoilValue(selectorFilterTodoIdsByPathname(pathname));
  const todoCounts = todoIdsByPathName.length;

  return <Fragment>{todoCounts}</Fragment>;
};
