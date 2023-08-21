import { render, screen, waitFor } from '@testing-library/react';
import { SectionStartToday } from '..';
import { ReactNode } from 'react';
import { configsSignInButton } from '@/button/button.configs';
import { sectionContents } from '@/section/section.consts';

jest.mock('@/transition/smoothTransitionWithDivRef', () => ({
  SmoothTransitionWithDivRef: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

const signInButtonConfigs = configsSignInButton({ preset: 'getStarted' });

describe('SectionStartToday', () => {
  const renderWithSectionStartToday = () => render(<SectionStartToday />);

  it('should render the gradients element properly', async () => {
    const { container } = renderWithSectionStartToday();
    const gradientElement = await screen.findByTestId('gradient-testid');

    expect(container).toBeInTheDocument();
    expect(gradientElement).toBeInTheDocument();
  });

  it('should render the content texts properly', () => {
    renderWithSectionStartToday();

    Object.values(sectionContents.startToday).forEach(async (value) => {
      await waitFor(() => {
        const text = screen.queryByText(value);
        expect(text).toBeInTheDocument();
      });
    });
  });

  it('should render the signInButton', async () => {
    renderWithSectionStartToday();
    const signInButton = await screen.findByText(signInButtonConfigs.buttonName);

    expect(signInButton).toBeInTheDocument();
  });
});
