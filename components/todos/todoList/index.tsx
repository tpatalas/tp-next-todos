import { DATA_PATHNAME_IMAGE } from '@collections/pathnameImage';
import { TypesPathnameImage } from '@lib/types';
import { cloudflareLoader } from '@stateLogics/utils';
import { atomPathnameImage } from '@states/misc';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import Image from 'next/image';
import { Fragment as TodosFragment } from 'react';
import { useRecoilValue } from 'recoil';
import { Todo } from './todo';
import { selectorFilterTodoIds } from '../todos.states';

export const TodoList = () => {
  const todoIds = useRecoilValue(selectorFilterTodoIds);
  const todoIdsReversed = [...todoIds].reverse();
  const imagePath = useRecoilValue(atomPathnameImage);
  const image = DATA_PATHNAME_IMAGE.find((item) => item.path === imagePath) || ({} as TypesPathnameImage);

  return (
    <TodosFragment>
      <ul>
        {todoIdsReversed.length !== 0 ? (
          <>
            {todoIdsReversed.map((todo, index) => (
              <li key={todo._id?.toString()}>
                <Todo
                  todo={todo}
                  index={index}
                />
              </li>
            ))}
          </>
        ) : (
          <SmoothTransition>
            <div className='mt-7 flex flex-col items-center justify-center'>
              <div className='flex h-full min-h-[300px] w-[300px] flex-col items-center justify-end'>
                <Image
                  loader={cloudflareLoader}
                  width={500}
                  height={500}
                  className='h-auto w-full'
                  src={image.path}
                  alt={image.alt}
                  sizes='25vw'
                  priority={true}
                />
              </div>
              <div className='mb-2 text-lg'>{image.title}</div>
              <div className='max-w-xs text-center text-sm tracking-wide text-slate-400 sm:max-w-md'>
                {image.description}
              </div>
            </div>
          </SmoothTransition>
        )}
      </ul>
    </TodosFragment>
  );
};
