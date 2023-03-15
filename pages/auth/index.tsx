import { atomUserVerificationRequest } from '@states/users';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

const VerificationConfirmation = dynamic(() =>
  import('@components/auth/verificationConfirmation').then((mod) => mod.VerificationConfirmation),
);
const AuthForm = dynamic(() => import('@components/auth/authForm').then((mod) => mod.AuthForm));

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
