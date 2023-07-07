import { Button } from '@buttons/button';
import { SvgLogoButton } from '@buttons/button/svgLogoButton';
import { LoadingSpinner } from '@components/loadable/loadingSpinner';
import { STYLE_BUTTON_FULL_BLUE } from '@data/stylePreset';
import { FloatingLabelInput } from '@inputs/floatingLabelInput';
import { optionsFloatingLabelsEmail } from '@options/loadingState';
import { classNames, validateEmailFormat } from '@stateLogics/utils';
import { atomLoadingSpinner } from '@states/misc';
import { DividerX } from '@ui/dividers/dividerX';
import dynamic from 'next/dynamic';
import { Fragment, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { Logo } from '@layout/layoutHeader/logo';
import { AuthErrorMessage } from '@auth/authErrorMessage';
import { atomAuthErrorMessage, atomAuthUser } from '@auth/auth.states';
import { useAuthFormSubmit, useAuthUserValueUpdate } from '@auth/auth.hooks';
import { USER } from '@auth/auth.consts';
import { SPINNER } from '@components/loadable/loadable.consts';

const UserSessionEffect = dynamic(() =>
  import('@user/userSessionGroupEffect/userSessionEffect').then((mod) => mod.UserSessionEffect),
);

const AuthErrorMessageEffect = dynamic(() =>
  import('@auth/authEffect/authErrorMessageEffect').then((mod) => mod.AuthErrorMessageEffect),
);

export const AuthForm = () => {
  const clientErrorMessage = useRecoilValue(atomAuthErrorMessage);
  const user = useRecoilValue(atomAuthUser);
  const isEmailInValidated = !validateEmailFormat(user.email);
  const updateUser = useAuthUserValueUpdate();
  const onSubmitHandler = useAuthFormSubmit(isEmailInValidated);
  const isLoadingSpinner = useRecoilValue(atomLoadingSpinner(SPINNER['authForm']));
  const isError = clientErrorMessage !== '';

  return (
    <Fragment>
      <div className='absolute left-0 right-0 top-1/2 m-auto h-fit w-full -translate-y-[60%] sm:w-fit'>
        <section className='border-slate-200 px-5 py-14 sm:w-[30rem] sm:rounded-xl sm:border sm:px-10 sm:shadow-2xl sm:shadow-slate-300'>
          <div className='mb-2 flex flex-col items-center justify-center sm:mb-5'>
            <div className='mb-8 mt-2 sm:mb-10'>
              <span className='sr-only'>Main logo</span>
              <Logo type='MainLogoOnlyWhite' />
            </div>
            <h1 className='mb-1 flex flex-row items-center justify-center text-2xl font-bold tracking-normal text-slate-800 sm:mb-3'>
              Sign in
            </h1>
            <h2 className='flex flex-row items-center justify-center text-lg text-slate-600'>
              Use your email to sign in
            </h2>
          </div>
          <AuthErrorMessage />
          <form
            onSubmit={onSubmitHandler}
            noValidate
          >
            <div className='mb-4'>
              <FloatingLabelInput
                options={optionsFloatingLabelsEmail(isError)}
                inputValue={user.email}
                onChange={(event) => updateUser(USER['email'], event.target.value)}
              />
            </div>
            <Button
              options={{
                type: 'submit',
                className: classNames(STYLE_BUTTON_FULL_BLUE, 'w-full flex flex-row justify-center'),
                isDisabled: isError || isLoadingSpinner,
              }}
            >
              <LoadingSpinner spinnerId={SPINNER['authForm']} />
              <span>Sign in with email</span>
            </Button>
            <div className='mb-5' />
            <DividerX options={{ margin: 'mb-5' }}>or</DividerX>
            <SvgLogoButton />
          </form>
        </section>
      </div>
      <Suspense fallback={null}>
        <AuthErrorMessageEffect />
        <UserSessionEffect />
      </Suspense>
    </Fragment>
  );
};
