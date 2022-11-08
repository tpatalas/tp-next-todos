import { Div as DivTodoItemFocuser } from '@containers/div';
import { dataDivContainerFocuser } from '@data/dataObjects';
import { useFocusOnClick } from '@hooks/useFocus';
import { NavigateWithKeyEffect } from '@states/Effects/navigateWithKeyEffect';
import { useKeyWithFocus } from 'lib/states/hooks/useKeys';
import { Types, TypesTodo } from 'lib/types';
import { useRef } from 'react';

type Props = Pick<TypesTodo, 'todo' | 'index'> & Pick<Types, 'children'>;

export const TodoItemFocuser = ({ todo, index, children }: Props) => {
  const divFocus = useRef<HTMLDivElement>(null);
  const focusKeyHandler = useKeyWithFocus(todo._id);
  const focusOnClick = useFocusOnClick(index);

  return (
    <DivTodoItemFocuser
      data={dataDivContainerFocuser}
      ref={divFocus}
      onKeyDown={focusKeyHandler}
      onClick={() => focusOnClick()}>
      <NavigateWithKeyEffect
        index={index}
        divFocus={divFocus}
        todo={todo}
      />
      {children}
    </DivTodoItemFocuser>
  );
};
