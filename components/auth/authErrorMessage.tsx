import { DATA_NEXTAUTH_ERROR } from '@collections/nextAuthError';
import { SvgIcon } from '@components/icons/svgIcon';
import { ICON_ERROR_FILL } from '@data/materialSymbols';
import { TypesOptionsAuthErrorMessage } from '@lib/types/typesOptions';
import { atomUserErrorMessage } from '@states/users';
import { classNames } from '@states/utils';
import { useNextQuery } from '@states/utils/hooks';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type Props = { options?: TypesOptionsAuthErrorMessage };

export const AuthErrorMessage = ({ options }: Props) => {
  const errorId = useNextQuery({ key: 'error' })?.toLowerCase();
  const serverError = DATA_NEXTAUTH_ERROR.find((error) => error._id === errorId);
  const clientErrorMessage = useRecoilValue(atomUserErrorMessage);
  const setClientErrorMessage = useSetRecoilState(atomUserErrorMessage);

  useEffect(() => {
    const errorMessage = serverError ? serverError.message : '';
    setClientErrorMessage(errorMessage as string);
  }, [serverError, setClientErrorMessage]);

  return (
    <span
      className={classNames(
        'mt-1 flex flex-row items-start',
        clientErrorMessage ? 'mb-5 rounded-xl bg-red-100 p-2' : 'mb-0',
      )}>
      <span className='h-full pr-1'>
        <SvgIcon
          options={{
            path: clientErrorMessage ? ICON_ERROR_FILL : '',
            className: classNames('w-[1.2rem] h-[1.2rem] mr-1', clientErrorMessage && 'fill-red-600'),
          }}
        />
      </span>
      <span className={classNames('text-sm', clientErrorMessage && 'text-red-600')}>
        {clientErrorMessage ? clientErrorMessage : options?.defaultMessage}
      </span>
    </span>
  );
};
