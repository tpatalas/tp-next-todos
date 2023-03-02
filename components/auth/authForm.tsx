import { useState } from 'react';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            required
          />
        </div>
        <div className='flex flex-col items-center'>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};
