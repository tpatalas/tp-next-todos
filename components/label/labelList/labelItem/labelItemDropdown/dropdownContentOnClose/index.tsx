import { TypesLabel } from '@label/label.types';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const TodosCount = dynamic(() => import('@layouts/app/todosCount').then((mod) => mod.TodosCount));

type Props = Pick<TypesLabel, 'label'>;

export const DropdownContentOnClose = ({ label }: Props) => {
  return (
    <span className='absolute right-[0.73rem] top-1/2 -translate-y-2/4 select-none text-xs tracking-tighter text-slate-400 group-hover:invisible'>
      <Suspense fallback={null}>
        <TodosCount label={label} />
      </Suspense>
    </span>
  );
};
