import { NavigateWithKeyEffect } from '@effects/navigateWithKeyEffect';
import { useFocusOnClick } from '@states/focusStates';
import { useKeyWithFocus } from '@states/keybindStates';
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
      <NavigateWithKeyEffect
        index={index}
        divFocus={divFocus}
        todo={todo}
      />
      {children}
    </div>
  );
};
