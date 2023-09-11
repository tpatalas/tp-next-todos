import { render } from '@testing-library/react';
import { SignInButton } from '..';
import { screen } from '@testing-library/react';
import { PropsButtonWithTooltip } from '@/button/button.types';
import { configsSignInButton } from '../signInButton.configs';

const signInButton = configsSignInButton({ preset: 'getStarted' });

describe('SignInButton', () => {
  const renderWithSignInButton = ({ configs = {} }: PropsButtonWithTooltip) =>
    render(<SignInButton configs={configs} />);

  it('should render the default signInButtonName', () => {
    const { container } = renderWithSignInButton({ configs: configsSignInButton() });
    const signInText = screen.getByText('Sign in');

    expect(container).toBeInTheDocument();
    expect(signInText).toBeInTheDocument();
  });

  it('should render the signInButtonName props', async () => {
    renderWithSignInButton({
      configs: configsSignInButton({ preset: 'getStarted', visible: 'show' }),
    });
    const signInText = screen.getByText(signInButton.buttonName);
    const tooltipText = await screen.findByText(signInButton.tooltip);

    expect(signInText).toBeInTheDocument();
    expect(tooltipText).toBeInTheDocument();
  });
});
