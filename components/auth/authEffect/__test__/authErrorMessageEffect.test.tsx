import { atomAuthUser } from '@auth/auth.states';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { screen } from '@testing-library/react';
import { RecoilState } from 'recoil';
import { AuthErrorMessageEffect } from '../authErrorMessageEffect';
import { MockErrorMessageObserver } from './__mock__/mockErrorMessageObserver';

type Props<T> = { node?: RecoilState<T>; state?: T };

describe('AuthErrorMessageEffect', () => {
  const renderAuthConfirmation = <T,>({ node, state }: Props<T>) => {
    const options = { session: null, node: node, state: state };
    return renderWithRecoilRootAndSession(
      <>
        <AuthErrorMessageEffect />
        <MockErrorMessageObserver />
      </>,
      options,
    );
  };

  const renderWithQueryElement = <T,>({ node, state }: Props<T>) => {
    const { container } = renderAuthConfirmation({ node: node, state: state });
    const defaultErrorMessage = screen.queryByText(/Something went wrong/i);

    return { container, defaultErrorMessage };
  };

  it('should render default error message correctly', async () => {
    const { container, defaultErrorMessage } = renderWithQueryElement({});

    expect(container).toBeInTheDocument();
    expect(defaultErrorMessage).toBeInTheDocument();
  });

  it('should return empty string when email is in a valid format', () => {
    const emailString = 'user@example.com';
    const { container, defaultErrorMessage } = renderWithQueryElement({
      node: atomAuthUser,
      state: { email: emailString },
    });

    expect(container).toBeInTheDocument();
    expect(defaultErrorMessage).not.toBeInTheDocument();
  });

  it('should return error message when email is not in a valid format', () => {
    const invalidEmailString = 'user@example';
    const { container, defaultErrorMessage } = renderWithQueryElement({
      node: atomAuthUser,
      state: { email: invalidEmailString },
    });

    expect(container).toBeInTheDocument();
    expect(defaultErrorMessage).toBeInTheDocument();
  });
});
