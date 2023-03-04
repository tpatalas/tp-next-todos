import { SvgIcon } from '@components/icons/svgIcon';
import { TypesOptionsDropdown } from '@lib/types/typesOptions';
import { classNames } from '@states/utils';
import { Fragment } from 'react';

type Props = { options: TypesOptionsDropdown };

export const MenuButtonIcon = ({ options }: Props) => {
  return (
    <Fragment>
      <SvgIcon
        options={{
          path: options.path,
          className: classNames(options.size ?? 'h-5 w-5', options.color ?? 'fill-gray-500 group-hover:fill-gray-700'),
        }}
      />
    </Fragment>
  );
};
