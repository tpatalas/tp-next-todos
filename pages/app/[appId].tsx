import { ErrorState } from '@components/loadable/errorState';
import { LoadingState } from '@components/loadable/loadingStates';
import { dataLoadingTodos } from '@data/dataObjects';
import { LayoutApp } from '@layouts/layoutApp';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';

const TodoList = dynamic(() => import('components/todos/todoList').then((mod) => mod.TodoList), {
  loading: () => <LoadingState data={dataLoadingTodos} />,
});

const AppById = () => {
  return (
    <LayoutApp>
      <ErrorBoundary fallback={<ErrorState />}>
        <TodoList />
      </ErrorBoundary>
    </LayoutApp>
  );
};
export default AppById;
