import { Types } from '@lib/types';
import { TypesOptionsDropdown } from '@lib/types/typesOptions';
import { classNames } from '@states/utils';

type Props = { options: TypesOptionsDropdown } & Pick<Types, 'children'>;

export const MenuButtonContent = ({ children, options }: Props) => {
  return (
    <span
      className={classNames(
        'flex flex-row items-start justify-start whitespace-nowrap pl-3 text-sm font-normal text-gray-500',
        options.text ?? 'group-hover:text-gray-700',
      )}>
      {children}
    </span>
  );
};
