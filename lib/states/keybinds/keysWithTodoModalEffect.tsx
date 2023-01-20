import { TypesTodo } from '@lib/types';
import { useKeyWithTodoModal } from '@states/keybinds/hooks';
import { useEffect } from 'react';

type Props = Partial<Pick<TypesTodo, 'todo'>>;

export const KeysWithTodoModalEffect = ({ todo }: Props) => {
  const windowCreateModalKeydownHandler = useKeyWithTodoModal(todo?._id);

  useEffect(() => {
    window.addEventListener('keydown', windowCreateModalKeydownHandler);
    return () => {
      window.removeEventListener('keydown', windowCreateModalKeydownHandler);
    };
  }, [windowCreateModalKeydownHandler]);

  return null;
};
