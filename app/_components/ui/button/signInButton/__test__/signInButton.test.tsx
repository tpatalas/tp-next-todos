import { render } from '@testing-library/react';
import { SignInButton } from '..';
import { PropsSignInButton } from '@/button/button.types';
import { screen } from '@testing-library/react';
import { configsSignInButton } from '@/button/button.configs';

const signInButton = configsSignInButton({ preset: 'getStarted' });

describe('SignInButton', () => {
  const renderWithSignInButton = ({ configs }: PropsSignInButton) =>
    render(<SignInButton configs={configs} />);

  it('should render the default signInButtonName', () => {
    const { container } = renderWithSignInButton({ configs: configsSignInButton() });
    const signInText = screen.getByText('Sign in');

    expect(container).toBeInTheDocument();
    expect(signInText).toBeInTheDocument();
  });

  it('should render the signInButtonName props', async () => {
    renderWithSignInButton({ configs: configsSignInButton({ preset: 'getStarted', isVisible: 'active' }) });
    const signInText = screen.getByText(signInButton.buttonName);
    const tooltipText = await screen.findByText(signInButton.tooltip);

    expect(signInText).toBeInTheDocument();
    expect(tooltipText).toBeInTheDocument();
  });
});
