import { Button } from '@buttons/button';
import { IconButton } from '@buttons/iconButton';
import { optionsFloatingLabelPassword, optionsFloatingLabelsEmail } from '@data/dataOptions';
import { USER } from '@data/dataTypesConst';
import { ICON_VISIBILITY, ICON_VISIBILITY_OFF } from '@data/materialSymbols';
import { STYLE_BUTTON_FULL_BLUE, STYLE_HOVER_SLATE_DARK } from '@data/stylePreset';
import { FloatingLabelInput } from '@inputs/floatingLabelInput';
import { atomUserCredentialError, atomUserNew } from '@states/users';
import { useUserAuthFormSubmit, useUserValueUpdate } from '@states/users/hooks';
import { classNames, validateEmailFormat, validateStrongPassword } from '@states/utils';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AuthErrorMessage } from './authErrorMessage';

export const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const user = useRecoilValue(atomUserNew);
  const updateUser = useUserValueUpdate();
  const isEmailInValidated = !validateEmailFormat(user.email) && user.email.length !== 0;
  const isPasswordNotStrong = !validateStrongPassword(user.password) && user.password.length !== 0;
  const signInEmailError = !isEmailInValidated ? 'mb-0' : 'mb-4';
  const signInPasswordError = !isPasswordNotStrong ? 'mb-4' : 'mb-8';
  const isSignInServerError = useRecoilValue(atomUserCredentialError(isSignIn));
  const isSignUpServerError = useRecoilValue(atomUserCredentialError(!isSignIn));
  const isThereAnError = isEmailInValidated || isPasswordNotStrong || isSignInServerError || isSignUpServerError;
  const onSubmitHandler = useUserAuthFormSubmit(isSignIn, isThereAnError);

  return (
    <section className='border-slate-150 w-[30rem] rounded-xl border px-10 py-14 sm:shadow-2xl sm:shadow-slate-300'>
      <div className='mb-8 flex flex-col items-center justify-center'>
        <h1 className='mb-4 flex flex-row items-center justify-center text-2xl text-slate-700'>
          {isSignIn ? 'Sign in' : 'Sign Up'}
        </h1>
        <h2 className='flex flex-row items-center justify-center text-lg text-slate-600'>
          {isSignIn ? 'Access your account' : 'Create your account'}
        </h2>
      </div>
      <form
        onSubmit={onSubmitHandler}
        noValidate>
        <div className={classNames(isSignIn ? signInEmailError : 'mb-4')}>
          <FloatingLabelInput
            options={optionsFloatingLabelsEmail(isEmailInValidated)}
            inputValue={user.email}
            onChange={(event) => updateUser(USER['email'], event.target.value)}
          />
          <AuthErrorMessage
            options={{
              isError: isEmailInValidated || isSignUpServerError,
              isSignIn: isSignIn,
              signUpDefaultMessage: 'Please enter your email address for your account',
              signUpErrorMessage: 'Please enter a valid email address',
              signInErrorMessage: 'Please check your email address',
            }}
          />
        </div>
        <div className={classNames(isSignIn ? signInPasswordError : 'mb-6')}>
          <div className='relative'>
            <FloatingLabelInput
              options={optionsFloatingLabelPassword(isPasswordShown, isPasswordNotStrong)}
              inputValue={user.password}
              onChange={(event) => updateUser(USER['password'], event.target.value)}
            />
            <IconButton
              options={{
                container: 'absolute top-1/2 right-2 -translate-y-1/2',
                color: 'fill-gray-400',
                path: isPasswordShown ? ICON_VISIBILITY_OFF : ICON_VISIBILITY,
                tooltip: isPasswordShown ? 'Hide password' : 'Show password',
              }}
              onClick={() => setIsPasswordShown((prev) => !prev)}
            />
          </div>
          <AuthErrorMessage
            options={{
              isError: isPasswordNotStrong,
              isSignIn: isSignIn,
              signUpDefaultMessage:
                'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
              signUpErrorMessage:
                'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
              signInErrorMessage: 'Please check your password',
            }}
          />
        </div>
        <div className='flex flex-col items-end'>
          <Button
            options={{
              type: 'submit',
              className: classNames(STYLE_BUTTON_FULL_BLUE, 'mb-2 w-full'),
              isDisabled: isThereAnError,
            }}>
            {isSignIn ? 'Sign in' : 'Create Account'}
          </Button>
          <Button
            options={{
              className: classNames(
                STYLE_HOVER_SLATE_DARK,
                'text-blue-500 text-sm transition-all py-1 px-2 rounded-lg',
              ),
              tooltip: isSignIn ? 'Create your account' : 'Sign in with existing account',
            }}
            onClick={() => setIsSignIn((prev) => !prev)}>
            {isSignIn ? 'Create account' : 'Sign in'}
          </Button>
        </div>
      </form>
    </section>
  );
};
