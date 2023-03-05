import { USER } from '@data/dataTypesConst';
import { atomUserNew } from '@states/users';
import { useUserCreate, useUserValueUpdate } from '@states/users/hooks';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const user = useRecoilValue(atomUserNew);
  const updateUser = useUserValueUpdate();
  const createUser = useUserCreate();
  const router = useRouter();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      const response = await signIn('credentials', {
        redirect: false,
        email: user.email,
        password: user.password,
      });
      return response && !response.error && router.replace('/app');
    }
    createUser();
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      const response = await signIn('credentials', {
        redirect: false,
        email: user.email,
        password: user.password,
      });
      return response && !response.error && router.replace('/app');
    }
    createUser();
  };

  return (
    <section>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            onChange={(event) => updateUser(USER['email'], event.target.value)}
            value={user.email}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            onChange={(event) => updateUser(USER['password'], event.target.value)}
            value={user.password}
            required
          />
        </div>
        <div className='flex flex-col items-center'>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            onClick={() => setIsLogin((prev) => !prev)}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};
