import { TypesTodo } from '@components/todos/todos.types';
import { useItemModalWithKey } from '@hooks/keybindings';
import { useEffect } from 'react';

type Props = Pick<TypesTodo, 'todo'>;

export const KeysWithItemModalEffect = ({ todo }: Props) => {
  const todoItemKeyHandler = useItemModalWithKey(todo._id);

  useEffect(() => {
    window.addEventListener('keydown', todoItemKeyHandler);
    return () => {
      window.removeEventListener('keydown', todoItemKeyHandler);
    };
  }, [todoItemKeyHandler]);

  return null;
};
