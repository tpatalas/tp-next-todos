import { PropsTodoItemFocuser } from '@components/todos/todos.types';
import { KeysWithNavigationEffect } from '@effects/KeysWithNavigateEffect';
import { useFocusOnClick } from '@hooks/focus';
import { useKeyWithFocus } from '@hooks/keybindings';
import { classNames } from '@stateLogics/utils';
import { Fragment as FocuserFragment, useRef } from 'react';
import { isMobile } from 'react-device-detect';

export const TodoItemFocuser = ({ todo, index, children }: PropsTodoItemFocuser) => {
  const divFocus = useRef<HTMLDivElement>(null);
  const focusKeyHandler = useKeyWithFocus(todo._id);
  const focusOnClick = useFocusOnClick(index);

  return (
    <FocuserFragment>
      <div
        tabIndex={0}
        className={classNames(
          'group/focuser focus:bg-blue-90 mr-1 flex flex-row rounded-lg px-2 pt-4 pb-2 outline-none hover:bg-gray-100 focus:bg-blue-100 sm:px-5',
          'w-[calc(100vw-5rem)] max-w-3xl md:w-[calc(65vw-5rem)] ml:w-[calc(70vw-5rem)]',
          isMobile ? 'sm:w-[calc(100vw-13rem)]' : 'sm:w-[calc(100vw-7rem)]',
        )}
        ref={divFocus}
        onKeyDown={focusKeyHandler}
        onClick={() => focusOnClick()}
      >
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
