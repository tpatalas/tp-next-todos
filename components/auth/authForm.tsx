import { Button } from '@buttons/button';
import { SvgLogoButton } from '@buttons/button/svgLogoButton';
import { LoadingSpinner } from '@components/loadable/loadingSpinner';
import { optionsFloatingLabelsEmail } from '@data/dataOptions';
import { SPINNER, USER } from '@data/dataTypesConst';
import { STYLE_BUTTON_FULL_BLUE } from '@data/stylePreset';
import { FloatingLabelInput } from '@inputs/floatingLabelInput';
import { atomLoadingSpinner } from '@states/misc';
import { atomUser, atomUserErrorMessage } from '@states/users';
import { ClientErrorMessageEffect } from '@states/users/clientErrorMessageEffect';
import { useUserAuthFormSubmit, useUserValueUpdate } from '@states/users/hooks';
import { classNames, validateEmailFormat } from '@states/utils';
import { Divider } from '@ui/dividers/divider';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { AuthErrorMessage } from './authErrorMessage';

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
      <ClientErrorMessageEffect />
      <div className='absolute right-0 left-0 top-[20%] bottom-[50%] m-auto h-fit w-full sm:top-[30%] sm:w-fit'>
        <section className='border-slate-150 px-5 py-14 sm:w-[30rem] sm:rounded-xl sm:border sm:px-10 sm:shadow-2xl sm:shadow-slate-300'>
          <div className='mb-5 flex flex-col items-center justify-center'>
            <h1 className='mb-4 flex flex-row items-center justify-center text-2xl text-slate-700'>Sign in</h1>
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
                className: classNames(STYLE_BUTTON_FULL_BLUE, 'w-full flex flex-row justify-center'),
                isDisabled: isError || isLoadingSpinner,
              }}>
              <LoadingSpinner spinnerId={SPINNER['authForm']} />
              <div>Sign in with email</div>
            </Button>
            <div className='mb-5' />
            <Divider margin='mb-5'>or</Divider>
            <SvgLogoButton />
          </form>
        </section>
      </div>
    </Fragment>
  );
};
