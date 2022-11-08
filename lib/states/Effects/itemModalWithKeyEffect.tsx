import { useItemModalWithKey } from '@hooks/useKeys';
import { TypesTodo } from '@lib/types';
import { useEffect } from 'react';

type Props = Pick<TypesTodo, 'todo'>;

export const ItemModalWithKeyEffect = ({ todo }: Props) => {
  const todoItemKeyHandler = useItemModalWithKey(todo._id);

  useEffect(() => {
    window.addEventListener('keydown', todoItemKeyHandler);
    return () => {
      window.removeEventListener('keydown', todoItemKeyHandler);
    };
  }, [todoItemKeyHandler]);

  return null;
};
