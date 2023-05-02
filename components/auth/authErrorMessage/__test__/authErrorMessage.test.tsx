import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { screen, waitFor } from '@testing-library/react';
import { RecoilState } from 'recoil';
import { AuthErrorMessage } from '..';
import { TypesAuthErrorMessage } from '@auth/auth.types';
import { atomAuthErrorMessage } from '@auth/auth.states';
import mockRouter from 'next-router-mock';

type Props<T> = {
  node?: RecoilState<T>;
  state?: T;
  defaultMessage?: TypesAuthErrorMessage['defaultMessage'];
};

describe('AuthErrorMessage', () => {
  const renderAuthErrorMessage = <T,>({ node, state, defaultMessage }: Props<T>) => {
    const options = { session: null, node: node, state: state };
    return renderWithRecoilRootAndSession(
      <AuthErrorMessage options={{ defaultMessage: defaultMessage }} />,
      options,
    );
  };

  const renderWithQueryElement = <T,>({ node, state, defaultMessage }: Props<T>) => {
    const { container } = renderAuthErrorMessage({
      node: node,
      state: state,
      defaultMessage: defaultMessage,
    });
    const message = defaultMessage && defaultMessage;
    const defaultMessageOutput = screen.queryByText(`${message}`);

    return { container, defaultMessageOutput };
  };

  it('should render defaultMessage if exists', () => {
    const { container, defaultMessageOutput } = renderWithQueryElement({
      defaultMessage: 'This is the default message',
    });

    expect(container).toBeInTheDocument();
    expect(defaultMessageOutput).toBeInTheDocument();
  });

  it('should render clientErrorMessage if exists', () => {
    const customClientErrorMessage = 'something went wrong';
    const { container } = renderWithQueryElement({
      node: atomAuthErrorMessage,
      state: customClientErrorMessage,
    });
    const clientErrorMessage = screen.queryByText(/Something went wrong/i);

    expect(container).toBeInTheDocument();
    expect(clientErrorMessage).toBeInTheDocument();
  });

  it('should render serverErrorMessage if exists', async () => {
    const { container } = renderWithQueryElement({
      node: atomAuthErrorMessage,
    });

    expect(container).toBeInTheDocument();

    await waitFor(() => {
      const urlString = '/test-url?error=default';
      mockRouter.push(urlString);
      expect(mockRouter).toMatchObject({ asPath: urlString });
    });
    await waitFor(() => {
      const serverErrorMessage = screen.queryByText(/Unable to sign in./i);
      expect(serverErrorMessage).toBeInTheDocument();
    });
  });
});
