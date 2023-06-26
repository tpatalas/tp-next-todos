import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { fireEvent, screen } from '@testing-library/react';
import { SignInButton } from '..';

const mockOnClick = jest.fn();

jest.mock('..', () => ({
  SignInButton: () => <button onClick={mockOnClick}>Sign in</button>,
}));

describe('signInButton', () => {
  const renderWithSignInButton = () => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(<SignInButton />, options);
  };

  it('should render the component', () => {
    const { container } = renderWithSignInButton();
    const signInButtonText = screen.getByText('Sign in');

    expect(container).toBeInTheDocument();
    expect(signInButtonText).toBeInTheDocument();
  });

  it('should called the mockOnClick when signIn button is clicked', async () => {
    const { container } = renderWithSignInButton();
    const signInButton = screen.getByText('Sign in');

    expect(container).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();

    fireEvent.click(signInButton);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
