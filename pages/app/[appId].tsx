import { ErrorState } from '@components/loadable/errorState';
import { LayoutApp } from '@layout/app';
import dynamic from 'next/dynamic';
import { Fragment as AppByIdFragment, ReactElement, Suspense } from 'react';

const TodoList = dynamic(() => import('components/todos/todoList').then((mod) => mod.TodoList), {
  ssr: false,
});
const LoadingTodos = dynamic(() => import('@components/todos/loadingTodos').then((mod) => mod.LoadingTodos));
const ErrorBoundary = dynamic(() => import('react-error-boundary').then((mod) => mod.ErrorBoundary));

const AppById = () => {
  return (
    <AppByIdFragment>
      <ErrorBoundary fallback={<ErrorState />}>
        <Suspense fallback={<LoadingTodos />}>
          <TodoList />
        </Suspense>
      </ErrorBoundary>
    </AppByIdFragment>
  );
};

AppById.getLayout = function getLayout(page: ReactElement) {
  return <LayoutApp>{page}</LayoutApp>;
};

export default AppById;
