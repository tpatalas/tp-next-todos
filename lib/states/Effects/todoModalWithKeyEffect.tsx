import { TypesTodo } from '@lib/types';
import { useKeyWithTodoModal } from '@states/keybindStates';
import { useEffect } from 'react';

type Props = Partial<Pick<TypesTodo, 'todo'>>;

export const TodoModalWithKeyEffect = ({ todo }: Props) => {
  const windowCreateModalKeydownHandler = useKeyWithTodoModal(todo?._id);

  useEffect(() => {
    window.addEventListener('keydown', windowCreateModalKeydownHandler);
    return () => {
      window.removeEventListener('keydown', windowCreateModalKeydownHandler);
    };
  }, [windowCreateModalKeydownHandler]);

  return null;
};
