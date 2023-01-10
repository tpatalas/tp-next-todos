import { TypesDataButton } from '@lib/types/typesData';
import { Types } from 'lib/types';
import { Button } from './button';

type Props = { data: TypesDataButton } & Partial<
  Pick<Types, 'className' | 'onClick' | 'conditionalRendering' | 'children'>
>;

export const DisableButton = ({
  data,
  onClick,
  conditionalRendering,
  children = data.name,
}: Props) => {
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
