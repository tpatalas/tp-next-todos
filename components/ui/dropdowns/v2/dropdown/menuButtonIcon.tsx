import { SvgIcon } from '@icon/svgIcon';
import { TypesOptionsDropdown } from '@lib/types/options';
import { classNames } from '@stateLogics/utils';
import { Fragment } from 'react';

type Props = { options: TypesOptionsDropdown };

export const MenuButtonIcon = ({ options }: Props) => {
  return (
    <Fragment>
      <SvgIcon
        options={{
          path: options.path,
          className: classNames(
            options.size ?? 'h-5 w-5',
            options.color ?? 'fill-gray-500 group-hover:fill-gray-700',
          ),
        }}
      />
    </Fragment>
  );
};
