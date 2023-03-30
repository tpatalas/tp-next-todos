import { ErrorState } from '@components/loadable/errorState';
import { LayoutApp } from '@layouts/app';
import dynamic from 'next/dynamic';
import { Fragment as AppFragment, ReactElement, Suspense } from 'react';

const TodoList = dynamic(() => import('components/todos/todoList').then((mod) => mod.TodoList), {
  ssr: false,
});
const FilterTodoIdsEffect = dynamic(() =>
  import('@effects/filterTodoIdsEffect').then((mod) => mod.FilterTodoIdsEffect),
);
const LoadingTodos = dynamic(() =>
  import('@components/loadable/loadingStates/loadingTodos').then((mod) => mod.LoadingTodos),
);
const ErrorBoundary = dynamic(() =>
  import('react-error-boundary').then((mod) => mod.ErrorBoundary),
);

const Demo = () => {
  return (
    <AppFragment>
      <ErrorBoundary fallback={<ErrorState />}>
        <Suspense fallback={<LoadingTodos />}>
          <FilterTodoIdsEffect />
          <TodoList />
        </Suspense>
      </ErrorBoundary>
    </AppFragment>
  );
};

Demo.getLayout = function getLayout(page: ReactElement) {
  return <LayoutApp>{page}</LayoutApp>;
};

export default Demo;
