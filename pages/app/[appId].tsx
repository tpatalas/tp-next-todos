import { ErrorState } from '@components/loadable/errorState';
import { LayoutApp } from '@layouts/layoutApp';
import dynamic from 'next/dynamic';
import { Fragment as AppByIdFragment, ReactElement } from 'react';

const LoadingTodos = dynamic(() =>
  import('@components/loadable/loadingStates/loadingTodos').then((mod) => mod.LoadingTodos),
);
const TodoList = dynamic(() => import('components/todos/todoList').then((mod) => mod.TodoList), {
  loading: () => <LoadingTodos />,
  ssr: false,
});
const FilterTodoIdsEffect = dynamic(() =>
  import('@states/todos/filterTodoIdsEffect').then((mod) => mod.FilterTodoIdsEffect),
);
const ErrorBoundary = dynamic(() => import('react-error-boundary').then((mod) => mod.ErrorBoundary));

const AppById = () => {
  return (
    <AppByIdFragment>
      <FilterTodoIdsEffect />
      <ErrorBoundary fallback={<ErrorState />}>
        <TodoList />
      </ErrorBoundary>
    </AppByIdFragment>
  );
};

AppById.getLayout = function getLayout(page: ReactElement) {
  return <LayoutApp>{page}</LayoutApp>;
};

export default AppById;
