import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import { useRecoilCallback } from 'recoil';
import { EditorComposer } from './editorComposer';

type Props = Partial<Pick<Types, 'todo'>>;

export const TodoEditors = ({ todo }: Props) => {
  const isTodoCompleted = useRecoilCallback(({ snapshot }) => () => {
    return (
      typeof todo !== 'undefined' &&
      snapshot.getLoadable(selectorSessionTodoItem(todo._id)).getValue().completed
    );
  });

  return (
    <>
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
    </>
  );
};
