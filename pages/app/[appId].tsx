import { ErrorState } from '@components/loadable/errorState';
import { LayoutApp } from '@layouts/layoutApp';
import dynamic from 'next/dynamic';
import { Fragment as AppByIdFragment } from 'react';

const LoadingTodos = dynamic(() =>
  import('@components/loadable/loadingStates/loadingTodos').then((mod) => mod.LoadingTodos),
);
const TodoList = dynamic(() => import('components/todos/todoList').then((mod) => mod.TodoList), {
  loading: () => <LoadingTodos />,
});
const FilterTodoIdsEffect = dynamic(() =>
  import('@states/todos/filterTodoIdsEffect').then((mod) => mod.FilterTodoIdsEffect),
);
const ErrorBoundary = dynamic(() =>
  import('react-error-boundary').then((mod) => mod.ErrorBoundary),
);

const AppById = () => {
  return (
    <AppByIdFragment>
      <FilterTodoIdsEffect />
      <LayoutApp>
        <ErrorBoundary fallback={<ErrorState />}>
          <TodoList />
        </ErrorBoundary>
      </LayoutApp>
    </AppByIdFragment>
  );
};
export default AppById;
