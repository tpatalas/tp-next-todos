import { Types } from '@lib/types';
import dynamic from 'next/dynamic';

type Props = Partial<Pick<Types, 'todo'>>;

const EditorComposer = dynamic(() => import('./editorComposer').then((mod) => mod.EditorComposer));

export const TodoEditors = ({ todo }: Props) => {
  return (
    <div className='mt-2 space-y-3 text-left sm:mx-3'>
      <EditorComposer
        placeholder='Todo Name'
        titleName='title'
        autoFocus={true}
        todo={todo}
      />
      <EditorComposer
        placeholder='Write your Note'
        titleName='note'
        todo={todo}
      />
    </div>
  );
};
