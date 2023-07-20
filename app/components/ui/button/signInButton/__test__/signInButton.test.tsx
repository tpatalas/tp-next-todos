import { render } from '@testing-library/react';
import { SignInButton } from '..';
import { PropsButtonWithTooltip } from '@/button/button.types';
import { screen } from '@testing-library/react';

describe('SignInButton', () => {
  const renderWithSignInButton = ({ options }: PropsButtonWithTooltip) =>
    render(<SignInButton options={options} />);

  it('should render the default signInButtonName', () => {
    const { container } = renderWithSignInButton({});
    const signInText = screen.getByText('Sign in');

    expect(container).toBeInTheDocument();
    expect(signInText).toBeInTheDocument();
  });

  it('should render the signInButtonName props', async () => {
    renderWithSignInButton({ options: { isVisible: true, signInButtonName: 'Get started' } });
    const signInText = screen.getByText('Get started');
    const tooltipText = await screen.findByText('Sign in');

    expect(signInText).toBeInTheDocument();
    expect(tooltipText).toBeInTheDocument();
  });
});
