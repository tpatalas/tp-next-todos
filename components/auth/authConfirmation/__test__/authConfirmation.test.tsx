import { atomAuthUser } from '@auth/auth.states';
import { SPINNER } from '@constAssertions/ui';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { atomLoadingSpinner } from '@states/misc';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Session } from 'next-auth';
import { RecoilState } from 'recoil';
import { AuthConfirmation } from '..';

type Props<T> = { session: Session | null; node?: RecoilState<T>; state?: T };

describe('AuthConfirmation', () => {
  const renderAuthConfirmation = <T,>({ session, node, state }: Props<T>) => {
    const options = { session: session, node: node, state: state };
    return renderWithRecoilRootAndSession(<AuthConfirmation />, options);
  };

  it('should render component correctly', () => {
    const { container } = renderAuthConfirmation({ session: null });
    const header = screen.getByText('Please check your email');
    const subHeader = screen.getByText(/Your sign-in link has been sent/i);
    const confirmationMessage = screen.getByText(/Please check your email to complete the sign-in process./i);
    const moreMessage = screen.getByText(/If you can't find the email, be sure to check your spam folder./i);
    const buttonName = screen.getByText(/Back to homepage/i);

    expect(container).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(subHeader).toBeInTheDocument();
    expect(confirmationMessage).toBeInTheDocument();
    expect(moreMessage).toBeInTheDocument();
    expect(buttonName).toBeInTheDocument();
  });

  it('should render active when user email is displayed', () => {
    const userEmail = 'user@example.com';
    const { container } = renderAuthConfirmation({
      session: null,
      node: atomAuthUser,
      state: { email: userEmail },
    });

    const email = screen.queryByText(/user@example.com/);

    expect(container).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  it('should render spinner onClick the Back to homepage button', async () => {
    const { container } = renderAuthConfirmation({
      session: null,
      node: atomLoadingSpinner(SPINNER['verificationConfirm']),
    });

    const backToHomepageButton = screen.getByRole('button', { name: /Back to homepage/i });
    const spinnerOn = screen.queryByText('active');
    const spinnerOff = screen.queryByText('inactive');

    expect(container).toBeInTheDocument();
    expect(backToHomepageButton).toBeInTheDocument();
    expect(spinnerOn).toBeNull();
    expect(spinnerOff).toBeInTheDocument();

    fireEvent.click(backToHomepageButton);

    await waitFor(() => {
      const spinnerOn = screen.queryByText('active');
      expect(spinnerOn).toBeInTheDocument();
    });
    await waitFor(() => {
      const spinnerOff = screen.queryByText('inactive');
      expect(spinnerOff).toBeNull();
    });
  });
});
