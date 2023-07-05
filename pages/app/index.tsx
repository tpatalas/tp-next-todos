import { ErrorState } from '@components/loadable/errorState';
import { LayoutApp } from '@layout/app';
import dynamic from 'next/dynamic';
import { Fragment as AppFragment, ReactElement, Suspense } from 'react';

const TodoList = dynamic(() => import('components/todos/todoList').then((mod) => mod.TodoList), {
  ssr: false,
});
const LoadingTodos = dynamic(() => import('@components/todos/loadingTodos').then((mod) => mod.LoadingTodos));
const ErrorBoundary = dynamic(() => import('react-error-boundary').then((mod) => mod.ErrorBoundary));

const App = () => {
  return (
    <AppFragment>
      <ErrorBoundary fallback={<ErrorState />}>
        <Suspense fallback={<LoadingTodos />}>
          <TodoList />
        </Suspense>
      </ErrorBoundary>
    </AppFragment>
  );
};

App.getLayout = function getLayout(page: ReactElement) {
  return <LayoutApp>{page}</LayoutApp>;
};

export default App;
