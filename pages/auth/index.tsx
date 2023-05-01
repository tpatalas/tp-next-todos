import { atomAuthVerificationRequest } from '@auth/auth.states';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

const AuthConfirmation = dynamic(() => import('@auth/authConfirmation').then((mod) => mod.AuthConfirmation));
const AuthForm = dynamic(() => import('@components/auth/authForm').then((mod) => mod.AuthForm));

const Auth = () => {
  const isVerificationRequest = useRecoilValue(atomAuthVerificationRequest);

  return (
    <Fragment>
      <Head>
        <title>Todos - Sign in</title>
      </Head>
      {!isVerificationRequest ? <AuthForm /> : <AuthConfirmation />}
    </Fragment>
  );
};

export default Auth;
