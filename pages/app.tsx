import { ErrorState } from '@components/loadable/errorState';
import { LoadingState } from '@components/loadable/loadingStates';
import { dataLoadingTodos } from '@data/dataObjects';
import { LayoutApp } from '@layouts/layoutApp';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';

const TodoList = dynamic(() => import('components/todos/todoList').then((mod) => mod.TodoList), {
  loading: () => <LoadingState data={dataLoadingTodos} />,
});

const App = () => {
  return (
    <LayoutApp>
      <div className='flex flex-col items-center'>
        <ErrorBoundary fallback={<ErrorState />}>
          <TodoList />
        </ErrorBoundary>
      </div>
    </LayoutApp>
  );
};
export default App;
