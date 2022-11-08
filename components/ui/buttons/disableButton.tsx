import { useConditionalCheckState } from '@hooks/useCondition';
import { TypesDataButton } from '@lib/types/typesData';
import { Types } from 'lib/types';
import { Button } from './button';

type Props = { data: TypesDataButton } & Partial<
  Pick<Types, 'className' | 'onClick' | 'condition' | 'children' | 'todo'>
>;

export const DisableButton = ({ todo, data, onClick, children = data.name }: Props) => {
  const condition = useConditionalCheckState(todo?._id);
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
