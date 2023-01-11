import { ErrorState } from '@components/loadable/errorState';
import { LoadingState } from '@components/loadable/loadingStates';
import { dataLoadingTodos } from '@data/dataObjects';
import { LayoutApp } from '@layouts/layoutApp';
import dynamic from 'next/dynamic';
import { Fragment as AppByIdFramgnet } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const TodoList = dynamic(() => import('components/todos/todoList').then((mod) => mod.TodoList), {
  loading: () => <LoadingState data={dataLoadingTodos} />,
});
const FilterTodoIdsEffect = dynamic(() =>
  import('@effects/filterTodoIdsEffect').then((mod) => mod.FilterTodoIdsEffect),
);

const AppById = () => {
  return (
    <AppByIdFramgnet>
      <FilterTodoIdsEffect />
      <LayoutApp>
        <ErrorBoundary fallback={<ErrorState />}>
          <TodoList />
        </ErrorBoundary>
      </LayoutApp>
    </AppByIdFramgnet>
  );
};
export default AppById;
