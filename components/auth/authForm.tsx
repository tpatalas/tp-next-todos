import { Button } from '@buttons/button';
import { optionsFloatingLabelsEmail } from '@data/dataOptions';
import { ERROR_TYPE, USER } from '@data/dataTypesConst';
import { STYLE_BUTTON_FULL_BLUE } from '@data/stylePreset';
import { FloatingLabelInput } from '@inputs/floatingLabelInput';
import { atomUserError, atomUser } from '@states/users';
import { useUserAuthFormSubmit, useUserValueUpdate } from '@states/users/hooks';
import { classNames, validateEmailFormat } from '@states/utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AuthErrorMessage } from './authErrorMessage';

export const AuthForm = () => {
  const isServerError = useRecoilValue(atomUserError(ERROR_TYPE['server']));
  const isClientError = useRecoilValue(atomUserError(ERROR_TYPE['client']));
  const setClientError = useSetRecoilState(atomUserError(ERROR_TYPE['client']));
  const isError = isServerError || isClientError;
  const user = useRecoilValue(atomUser);
  const updateUser = useUserValueUpdate();
  const isEmailInValidated = !validateEmailFormat(user.email) && user.email.length !== 0;
  const onSubmitHandler = useUserAuthFormSubmit(isEmailInValidated);

  return (
    <div className='absolute right-0 left-0 top-[5%] bottom-[50%] m-auto h-fit w-full sm:top-[20%] sm:w-fit'>
      <section className='border-slate-150 px-5 py-14 sm:w-[30rem] sm:rounded-xl sm:border sm:px-10 sm:shadow-2xl sm:shadow-slate-300'>
        <div className='mb-8 flex flex-col items-center justify-center'>
          <h1 className='mb-4 flex flex-row items-center justify-center text-2xl text-slate-700'>Sign in</h1>
          <h2 className='flex flex-row items-center justify-center text-lg text-slate-600'>
            Use your email to sign in
          </h2>
        </div>
        <form
          onSubmit={onSubmitHandler}
          noValidate>
          <div className={classNames(isError ? 'mb-4' : 'mb-1')}>
            <FloatingLabelInput
              options={optionsFloatingLabelsEmail(isError)}
              inputValue={user.email}
              onChange={(event) => {
                updateUser(USER['email'], event.target.value);
                !isEmailInValidated && setClientError(false);
              }}
            />
            <AuthErrorMessage
              options={{
                isError: isError,
                errorMessage: isClientError
                  ? 'Please enter a valid email address'
                  : isServerError
                  ? 'Something went wrong. Please try again'
                  : '',
              }}
            />
          </div>
          <Button
            options={{
              type: 'submit',
              className: classNames(STYLE_BUTTON_FULL_BLUE, 'w-full'),
              isDisabled: isClientError,
            }}>
            Sign in with email
          </Button>
        </form>
      </section>
    </div>
  );
};
