import { Types } from 'lib/types';
import { Button } from './button';
import { TypesOptionsButton } from '@lib/types/options';

type Props = { options: TypesOptionsButton } & Partial<
  Pick<Types, 'className' | 'onClick' | 'isConditionalRendering' | 'children'>
>;

export const DisableButton = ({
  options,
  onClick,
  isConditionalRendering,
  children = options.name,
}: Props) => {
  const buttonOptions = {
    isDisabled: isConditionalRendering ? true : false,
    kbd: isConditionalRendering ? '' : options.kbd,
    tooltip: isConditionalRendering ? '' : options.tooltip,
    className: options.className,
  };

  return (
    <Button
      options={buttonOptions}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
