import { SvgIcon } from '@components/icons/svgIcon';
import { ICON_ERROR_FILL } from '@data/materialSymbols';
import { TypesOptionsAuthErrorMessage } from '@lib/types/typesOptions';
import { classNames } from '@states/utils';

type Props = { options: TypesOptionsAuthErrorMessage };

export const AuthErrorMessage = ({ options }: Props) => {
  return (
    <span className='mt-1 ml-1 flex flex-row items-start'>
      <span className='h-full pr-1'>
        <SvgIcon
          options={{
            path: options.isError ? ICON_ERROR_FILL : '',
            className: classNames('w-[1.2rem] h-[1.2rem] mr-1', options.isError && 'fill-red-600'),
          }}
        />
      </span>
      <p className={classNames('text-sm', options.isError && 'text-red-600')}>
        {options.isError ? options.errorMessage : options.defaultMessage}
      </p>
    </span>
  );
};
