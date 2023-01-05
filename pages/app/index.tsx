import { ErrorState } from '@components/loadable/errorState';
import { LoadingState } from '@components/loadable/loadingStates';
import { dataLoadingTodos } from '@data/dataObjects';
import { FilterTodoIdsEffect } from '@effects/filterTodoIdsEffect';
import { LayoutApp } from '@layouts/layoutApp';
import dynamic from 'next/dynamic';
import { Fragment as AppFragment } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const TodoList = dynamic(() => import('components/todos/todoList').then((mod) => mod.TodoList), {
  loading: () => <LoadingState data={dataLoadingTodos} />,
});

const App = () => {
  return (
    <AppFragment>
      <FilterTodoIdsEffect />
      <LayoutApp>
        <ErrorBoundary fallback={<ErrorState />}>
          <TodoList />
        </ErrorBoundary>
      </LayoutApp>
    </AppFragment>
  );
};
export default App;
