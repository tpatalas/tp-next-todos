import { useFocusOnClick } from '@states/focus/hooks';
import { useKeyWithFocus } from '@states/keybinds/hooks';
import { KeysWithNavigationEffect } from '@states/keybinds/KeysWithNavigateEffect';
import { Types, TypesTodo } from 'lib/types';
import { useRef } from 'react';

type Props = Pick<TypesTodo, 'todo' | 'index'> & Pick<Types, 'children'>;

export const TodoItemFocuser = ({ todo, index, children }: Props) => {
  const divFocus = useRef<HTMLDivElement>(null);
  const focusKeyHandler = useKeyWithFocus(todo._id);
  const focusOnClick = useFocusOnClick(index);

  return (
    <div
      tabIndex={0}
      className='mr-2 ml-5 flex w-full max-w-2xl flex-row rounded-lg p-3 outline-none transition-all hover:bg-slate-100 focus:bg-blue-100 focus:bg-opacity-80 sm:ml-4'
      ref={divFocus}
      onKeyDown={focusKeyHandler}
      onClick={() => focusOnClick()}>
      <KeysWithNavigationEffect
        index={index}
        divFocus={divFocus}
        todo={todo}
      />
      {children}
    </div>
  );
};
