import { Types } from '@lib/types';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import { classNames } from '@states/utils';
import dynamic from 'next/dynamic';
import { useRecoilCallback } from 'recoil';

type Props = Partial<Pick<Types, 'todo'>>;

const EditorComposer = dynamic(() => import('./editorComposer').then((mod) => mod.EditorComposer), { ssr: false });

export const TodoEditors = ({ todo }: Props) => {
  const isTodoCompleted = useRecoilCallback(({ snapshot }) => () => {
    return typeof todo !== 'undefined' && snapshot.getLoadable(atomQueryTodoItem(todo._id)).getValue().completed;
  });

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
