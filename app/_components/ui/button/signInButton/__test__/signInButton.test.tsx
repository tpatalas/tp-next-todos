import { render } from '@testing-library/react';
import { SignInButton } from '..';
import { PropsButtonWithTooltip } from '@/button/button.types';
import { screen } from '@testing-library/react';
import { configsSignInButton } from '@/button/button.configs';

describe('SignInButton', () => {
  const renderWithSignInButton = ({ configs }: PropsButtonWithTooltip) =>
    render(<SignInButton configs={configs} />);

  it('should render the default signInButtonName', () => {
    const { container } = renderWithSignInButton({ configs: configsSignInButton['default'] });
    const signInText = screen.getByText('Sign in');

    expect(container).toBeInTheDocument();
    expect(signInText).toBeInTheDocument();
  });

  it('should render the signInButtonName props', async () => {
    renderWithSignInButton({ configs: { ...configsSignInButton['getStarted'], isVisible: true } });
    const signInText = screen.getByText(configsSignInButton.getStarted.signInButtonName as string);
    const tooltipText = await screen.findByText(configsSignInButton.getStarted.tooltip as string);

    expect(signInText).toBeInTheDocument();
    expect(tooltipText).toBeInTheDocument();
  });
});
