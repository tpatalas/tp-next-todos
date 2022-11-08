import { STYLE_BUTTON_KEY_ONLY_RING } from '@data/stylePreset';
import { classNames } from '@lib/utils';
import { Types, TypesElement, TypesInputAttributes } from 'lib/types';
import dynamic from 'next/dynamic';
const Tooltip = dynamic(() => import('@tooltips/tooltips').then((mod) => mod.Tooltip));

type Props = Partial<
  Pick<Types, 'className' | 'name' | 'disabled' | 'kbd' | 'tooltip'> & {
    type: Exclude<TypesElement['type'], 'button' | 'submit' | 'reset'>;
  } & TypesInputAttributes
>;

export const Input = ({ name, tooltip, kbd, type, className, checked, onChange, disabled }: Props) => {
  return (
    <Tooltip
      tooltip={tooltip}
      kbd={kbd}>
      <input
        name={name}
        type={type}
        className={classNames(STYLE_BUTTON_KEY_ONLY_RING, className)}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </Tooltip>
  );
};
