import { USER } from '@data/dataTypesConst';
import { atomUserNew } from '@states/users';
import { useUserCreate, useUserValueUpdate } from '@states/users/hooks';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const user = useRecoilValue(atomUserNew);
  const updateUser = useUserValueUpdate();
  const createUser = useUserCreate();

  return (
    <section>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          isLogin ? '' : createUser();
        }}>
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
