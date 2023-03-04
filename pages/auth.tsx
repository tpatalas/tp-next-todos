import { AuthForm } from '@components/auth/authForm';
import Head from 'next/head';
import { Fragment } from 'react';

const Auth = () => {
  return (
    <Fragment>
      <Head>
        <title>My Todo App: Sign in</title>
      </Head>
      <div className='mt-20 flex flex-row items-center justify-center'>
        <AuthForm />
      </div>
    </Fragment>
  );
};

export default Auth;
