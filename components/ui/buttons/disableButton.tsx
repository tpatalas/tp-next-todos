import { TypesDataButton } from '@lib/types/typesData';
import { useLabelConditionalCheckState, useTodoConditionalCheckState } from '@states/utilsStates';
import { Types } from 'lib/types';
import { Button } from './button';

type Props = { data: TypesDataButton } & Partial<
  Pick<Types, 'className' | 'onClick' | 'condition' | 'children' | 'todo' | 'label'>
>;

export const DisableButton = ({ todo, label, data, onClick, children = data.name }: Props) => {
  const condition =
    typeof label === 'undefined'
      ? useTodoConditionalCheckState(todo?._id)
      : useLabelConditionalCheckState(label._id);
  const conditionalRendering = typeof data.condition !== 'undefined' && condition(data.condition);

  return (
    <Button
      data={{
        disabled: conditionalRendering ? true : false,
        kbd: conditionalRendering ? '' : data.kbd,
        tooltip: conditionalRendering ? '' : data.tooltip,
        className: data.className,
      }}
      onClick={onClick}>
      {children}
    </Button>
  );
};
