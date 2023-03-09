import { AuthForm } from '@components/auth/authForm';
import { VerificationConfirmation } from '@components/auth/verificationConfirmation';
import { atomUserVerificationRequest } from '@states/users';
import Head from 'next/head';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

const Auth = () => {
  const isVerificationRequest = useRecoilValue(atomUserVerificationRequest);

  return (
    <Fragment>
      <Head>
        <title>My Todo App: Sign in</title>
      </Head>
      {!isVerificationRequest ? <AuthForm /> : <VerificationConfirmation />}
    </Fragment>
  );
};

export default Auth;
