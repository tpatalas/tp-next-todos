import { AuthForm } from '@components/auth/authForm';
import Head from 'next/head';
import { Fragment } from 'react';

const Auth = () => {
  return (
    <Fragment>
      <Head>
        <title>My Todo App: Sign in</title>
      </Head>
      <div className='absolute top-[25%] bottom-1/2 right-0 left-0 m-auto h-fit w-fit'>
        <AuthForm />
      </div>
    </Fragment>
  );
};

export default Auth;
