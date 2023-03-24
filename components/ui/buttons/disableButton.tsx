import { Types } from 'lib/types';
import { Button } from './button';
import { TypesOptionsButton } from '@lib/types/options';

type Props = { options: TypesOptionsButton } & Partial<
  Pick<Types, 'className' | 'onClick' | 'isConditionalRendering' | 'children'>
>;

export const DisableButton = ({ options, onClick, isConditionalRendering, children = options.name }: Props) => {
  return (
    <Button
      options={{
        isDisabled: isConditionalRendering ? true : false,
        kbd: isConditionalRendering ? '' : options.kbd,
        tooltip: isConditionalRendering ? '' : options.tooltip,
        className: options.className,
      }}
      onClick={onClick}>
      {children}
    </Button>
  );
};
