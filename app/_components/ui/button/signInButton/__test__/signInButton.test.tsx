import { render } from '@testing-library/react';
import { SignInButton } from '..';
import { screen } from '@testing-library/react';
import { configsButton } from '@/button/button.configs';
import { PropsButtonWithTooltip } from '@/button/button.types';
import { configsTooltip } from '@/tooltip/tooltip.configs';

const signInButton = configsButton({ preset: 'signInGetStarted' });
const signInTooltip = configsTooltip({ preset: 'signInGetStarted' });

describe('SignInButton', () => {
  const renderWithSignInButton = ({ configsButton, configsTooltip }: PropsButtonWithTooltip) =>
    render(
      <SignInButton
        configsButton={configsButton}
        configsTooltip={configsTooltip}
      />,
    );

  it('should render the default signInButtonName', () => {
    const { container } = renderWithSignInButton({ configsButton: configsButton() });
    const signInText = screen.getByText('Sign in');

    expect(container).toBeInTheDocument();
    expect(signInText).toBeInTheDocument();
  });

  it('should render the signInButtonName props', async () => {
    renderWithSignInButton({
      configsButton: configsButton({ preset: 'signInGetStarted' }),
      configsTooltip: configsTooltip({ preset: 'signInGetStarted', visible: 'show' }),
    });
    const signInText = screen.getByText(signInButton.buttonName);
    const tooltipText = await screen.findByText(signInTooltip.tooltip);

    expect(signInText).toBeInTheDocument();
    expect(tooltipText).toBeInTheDocument();
  });
});
