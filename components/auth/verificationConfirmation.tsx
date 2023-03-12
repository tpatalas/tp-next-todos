import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { SvgIcon } from '@components/icons/svgIcon';
import { LoadingSpinner } from '@components/loadable/loadingSpinner';
import { SPINNER } from '@data/dataTypesConst';
import { ICON_MARK_EMAIL_READ } from '@data/materialSymbols';
import { STYLE_BUTTON_FULL_BLUE } from '@data/stylePreset';
import { atomLoadingSpinner } from '@states/misc';
import { atomUser } from '@states/users';
import { classNames } from '@states/utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const VerificationConfirmation = () => {
  const user = useRecoilValue(atomUser);
  const setLoadingSpinner = useSetRecoilState(atomLoadingSpinner(SPINNER['verificationConfirm']));
  const isLoadingSpinner = useRecoilValue(atomLoadingSpinner(SPINNER['verificationConfirm']));

  return (
    <div className='absolute right-0 left-0 top-[20%] bottom-[50%] m-auto h-fit w-full sm:top-[30%] sm:w-fit'>
      <section className='border-slate-150 flex flex-col items-center justify-center px-5 py-14 text-slate-700 sm:w-[35rem] sm:rounded-xl sm:border sm:px-10 sm:shadow-2xl sm:shadow-slate-300'>
        <span className='mb-4 rounded-full bg-slate-900 bg-opacity-5 p-4'>
          <SvgIcon
            options={{
              path: ICON_MARK_EMAIL_READ,
              className: classNames('w-14 h-14 fill-blue-500'),
            }}
          />
        </span>
        <h1 className='mb-8 text-2xl'>Please check your email</h1>
        <div className='mb-12 space-y-4 text-center text-base'>
          <p>
            Your sign-in link has been sent
            {user.email ? (
              <span>
                {' '}
                to <strong>{user.email}</strong>.{' '}
              </span>
            ) : (
              <span>! </span>
            )}
            Please check your email to complete the sign-in process.
          </p>
          <p>If you can&apos;t find the email, be sure to check your spam folder.</p>
        </div>
        <PrefetchRouterButton
          options={{
            container: 'w-full',
            path: '/',
            isPrefetchingOnHover: true,
            isDisabled: isLoadingSpinner,
            className: classNames(STYLE_BUTTON_FULL_BLUE, 'w-full flex flex-row justify-center'),
          }}
          onClick={() => setLoadingSpinner(true)}>
          <LoadingSpinner spinnerId={SPINNER['verificationConfirm']} />
          <div>Back to homepage</div>
        </PrefetchRouterButton>
      </section>
    </div>
  );
};
