import { Button } from '@buttons/button';
import { SvgLogoButton } from '@buttons/button/svgLogoButton';
import { LoadingSpinner } from '@components/loadable/loadingSpinner';
import { USER } from '@constAssertions/misc';
import { SPINNER } from '@constAssertions/ui';
import { STYLE_BUTTON_FULL_BLUE } from '@data/stylePreset';
import { useUserAuthFormSubmit, useUserValueUpdate } from '@hooks/users';
import { FloatingLabelInput } from '@inputs/floatingLabelInput';
import { optionsFloatingLabelsEmail } from '@options/loadingState';
import { classNames, validateEmailFormat } from '@stateLogics/utils';
import { atomLoadingSpinner } from '@states/misc';
import { atomUser, atomUserErrorMessage } from '@states/users';
import { DividerX } from '@ui/dividers/dividerX';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { AuthErrorMessage } from './authErrorMessage';
import { Logo } from '@layouts/layoutHeader/logo';

const UserAuthGroupEffect = dynamic(() =>
  import('@effects/users').then((mod) => mod.UserAuthGroupEffect),
);

export const AuthForm = () => {
  const clientErrorMessage = useRecoilValue(atomUserErrorMessage);
  const user = useRecoilValue(atomUser);
  const isEmailInValidated = !validateEmailFormat(user.email);
  const updateUser = useUserValueUpdate();
  const onSubmitHandler = useUserAuthFormSubmit(isEmailInValidated);
  const isLoadingSpinner = useRecoilValue(atomLoadingSpinner(SPINNER['authForm']));
  const isError = clientErrorMessage !== '';

  return (
    <Fragment>
      <div className='absolute left-0 right-0 top-1/2 m-auto h-fit w-full -translate-y-[65%] sm:w-fit sm:-translate-y-[60%]'>
        <section className='border-slate-200 px-5 py-14 sm:w-[30rem] sm:rounded-xl sm:border sm:px-10 sm:shadow-2xl sm:shadow-slate-300'>
          <div className='mb-5 flex flex-col items-center justify-center'>
            <div className='mb-10 mt-2'>
              <Logo type='MainLogoOnlyWhite' />
            </div>
            <h1 className='mb-3 flex flex-row items-center justify-center text-2xl font-bold tracking-normal text-slate-800'>
              Sign in
            </h1>
            <h2 className='flex flex-row items-center justify-center text-lg text-slate-600'>
              Use your email to sign in
            </h2>
          </div>
          <AuthErrorMessage />
          <form
            onSubmit={onSubmitHandler}
            noValidate>
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
                className: classNames(
                  STYLE_BUTTON_FULL_BLUE,
                  'w-full flex flex-row justify-center',
                ),
                isDisabled: isError || isLoadingSpinner,
              }}>
              <LoadingSpinner spinnerId={SPINNER['authForm']} />
              <span>Sign in with email</span>
            </Button>
            <div className='mb-5' />
            <DividerX options={{ margin: 'mb-5' }}>or</DividerX>
            <SvgLogoButton />
          </form>
        </section>
      </div>
      <UserAuthGroupEffect />
    </Fragment>
  );
};
