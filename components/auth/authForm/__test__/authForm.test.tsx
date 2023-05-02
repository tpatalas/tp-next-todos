import { atomAuthErrorMessage, atomAuthUser } from '@auth/auth.states';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RecoilState } from 'recoil';
import { AuthForm } from '..';
import 'whatwg-fetch';

type Props<T> = {
  node?: RecoilState<T>;
  state?: T;
};

describe('AuthFrom', () => {
  const renderAuthForm = <T,>({ node, state }: Props<T>) => {
    const options = { session: null, node: node, state: state };
    return renderWithRecoilRootAndSession(<AuthForm />, options);
  };
  const invalidEmailString = 'user@example';
  const validEmailString = 'user@example.com';

  it('should render string elements within AuthForm', () => {
    const { container } = renderAuthForm({});

    const signIn = screen.queryByText('Sign in');
    const signInDescription = screen.queryByText(/Use your email to sign in/i);
    const signWithEmail = screen.queryByText(/Sign in with email/i);
    const orOAuth = screen.queryByText(/or/i);

    expect(container).toBeInTheDocument();
    expect(signIn).toBeInTheDocument();
    expect(signInDescription).toBeInTheDocument();
    expect(signWithEmail).toBeInTheDocument();
    expect(orOAuth).toBeInTheDocument();
  });

  it('should render Logo component within AuthForm', () => {
    const { container } = renderAuthForm({});
    const logo = screen.queryByText(/Main logo/i);

    expect(container).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });

  it('should AuthErrorMessage mounted and display error message', async () => {
    const testErrorMessage = 'There is nothing wrong here';
    const { container } = renderAuthForm({ node: atomAuthErrorMessage, state: testErrorMessage });
    const errorMessage = screen.queryByText(testErrorMessage);

    expect(container).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  it('should return error message whenever user submit the form while email is invalid', async () => {
    const { container } = renderAuthForm({
      node: atomAuthUser,
      state: { email: invalidEmailString },
    });
    const submitButton = screen.getByRole('button', { name: /Sign in with email/i });

    expect(container).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);
    await waitFor(() => {
      const errorMessage = screen.queryByText(/Please enter a valid email address./i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should not return error message whenever user submit the form while  is valid', async () => {
    const { container } = renderAuthForm({
      node: atomAuthUser,
      state: { email: validEmailString },
    });
    const submitButton = screen.getByRole('button', { name: /Sign in with email/i });

    expect(container).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);
    await waitFor(() => {
      const errorMessage = screen.queryByText(/Please enter a valid email address./i);
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});
