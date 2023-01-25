import { useFocusOnClick } from '@states/focus/hooks';
import { useKeyWithFocus } from '@states/keybinds/hooks';
import { KeysWithNavigationEffect } from '@states/keybinds/KeysWithNavigateEffect';
import { Types, TypesTodo } from 'lib/types';
import { Fragment as FocuserFragment, useRef } from 'react';

type Props = Pick<TypesTodo, 'todo' | 'index'> & Pick<Types, 'children'>;

export const TodoItemFocuser = ({ todo, index, children }: Props) => {
  const divFocus = useRef<HTMLDivElement>(null);
  const focusKeyHandler = useKeyWithFocus(todo._id);
  const focusOnClick = useFocusOnClick(index);

  return (
    <FocuserFragment>
      <div
        tabIndex={0}
        className='group/focuser flex w-full max-w-2xl flex-row rounded-lg bg-gradient-to-r px-3 pt-4 pb-2 outline-none hover:bg-slate-100 focus:bg-blue-100'
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
    </FocuserFragment>
  );
};
