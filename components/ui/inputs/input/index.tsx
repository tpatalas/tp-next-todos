import { STYLE_BUTTON_KEY_ONLY_RING } from '@data/stylePreset';
import { classNames } from '@stateLogics/utils';
import { Types, TypesElement, TypesInputAttributes } from 'lib/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const Tooltip = dynamic(() => import('@tooltips/tooltips').then((mod) => mod.Tooltip));

type Props = Partial<
  Pick<Types, 'className' | 'name' | 'isDisabled' | 'kbd' | 'tooltip'> & {
    type: Exclude<TypesElement['type'], 'button' | 'submit' | 'reset'>;
  } & TypesInputAttributes
>;

export const Input = ({ name, tooltip, kbd, type, className, isChecked, onChange, isDisabled }: Props) => {
  const [isClicked, setClick] = useState(false);

  return (
    <Tooltip
      options={{
        tooltip: isClicked ? undefined : tooltip,
        kbd: isClicked ? undefined : kbd,
      }}>
      <input
        name={name}
        type={type}
        className={classNames(STYLE_BUTTON_KEY_ONLY_RING, className)}
        onMouseDown={() => setClick(true)}
        onMouseEnter={() => setClick(false)}
        onMouseLeave={() => setClick(true)}
        checked={isChecked}
        onChange={onChange}
        disabled={isDisabled}
      />
    </Tooltip>
  );
};
