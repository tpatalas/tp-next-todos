import { TypesTodo } from '@components/todos/todos.types';
import { classNames } from '@stateLogics/utils';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import dynamic from 'next/dynamic';
import { useRecoilCallback } from 'recoil';

const EditorComposer = dynamic(() => import('@editor/editorComposer').then((mod) => mod.EditorComposer));

export const TodoEditors = ({ todo }: Partial<Pick<TypesTodo, 'todo'>>) => {
  const isTodoCompleted = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        return (
          typeof todo !== 'undefined' &&
          snapshot.getLoadable(selectorSessionTodoItem(todo._id)).getValue().completed
        );
      },
    [todo],
  );

  return (
    <div className={classNames('mx-3 mt-2 space-y-3 text-left', isTodoCompleted() && 'opacity-50')}>
      <EditorComposer
        placeholder={!isTodoCompleted() ? 'Todo Name' : ''}
        titleName='title'
        isAutoFocus={true}
        todo={todo}
      />
      <EditorComposer
        placeholder={!isTodoCompleted() ? 'Write your Note' : ''}
        titleName='note'
        todo={todo}
      />
    </div>
  );
};
