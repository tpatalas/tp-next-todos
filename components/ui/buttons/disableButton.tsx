import { TypesDataButton } from '@lib/types/typesData';
import { Types } from 'lib/types';
import { Button } from './button';

type Props = { data: TypesDataButton } & Partial<
  Pick<Types, 'className' | 'onClick' | 'isConditionalRendering' | 'children'>
>;

export const DisableButton = ({
  data,
  onClick,
  isConditionalRendering,
  children = data.name,
}: Props) => {
  return (
    <Button
      data={{
        isDisabled: isConditionalRendering ? true : false,
        kbd: isConditionalRendering ? '' : data.kbd,
        tooltip: isConditionalRendering ? '' : data.tooltip,
        className: data.className,
      }}
      onClick={onClick}>
      {children}
    </Button>
  );
};
