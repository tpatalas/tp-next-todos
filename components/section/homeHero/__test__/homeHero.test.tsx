import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { HomeHero } from '..';
import { screen } from '@testing-library/react';
import { homeHeroText } from '@components/section/section.consts';
import { ReactNode } from 'react';

jest.mock('@ui/transitions/smoothTransition', () => ({
  SmoothTransition: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('HomeHero', () => {
  const renderWithHomeHero = () => renderWithRecoilRootAndSession(<HomeHero />);

  it('should render the correct content texts for the HomeHero component', () => {
    const { container } = renderWithHomeHero();
    const titleText = screen.getByText(homeHeroText.title);
    const subTitleText = screen.getByText(homeHeroText.subTitle);
    const contentText = screen.getByText(homeHeroText.content);

    expect(container).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect(subTitleText).toBeInTheDocument();
    expect(contentText).toBeInTheDocument();
  });

  it('should render the gradient element properly', () => {
    renderWithHomeHero();
    const gradientElementTestId = screen.getByTestId('gradient-testid');

    expect(gradientElementTestId).toBeInTheDocument();
  });
});
